
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

interface PaymentRequest {
  amount: number;
  phoneNumber: string;
  provider: 'mpesa' | 'mtn_momo' | 'airtel_money';
  userId: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount, phoneNumber, provider, userId }: PaymentRequest = await req.json();
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Create payment record
    const { data: payment, error: paymentError } = await supabase
      .from('mobile_money_payments')
      .insert({
        user_id: userId,
        amount,
        phone_number: phoneNumber,
        provider,
        status: 'initiated'
      })
      .select()
      .single();

    if (paymentError) {
      throw new Error('Failed to create payment record');
    }

    let paymentResult;

    try {
      if (provider === 'mpesa') {
        paymentResult = await processMpesaPayment(amount, phoneNumber, payment.id);
      } else if (provider === 'mtn_momo') {
        paymentResult = await processMtnMomoPayment(amount, phoneNumber, payment.id);
      } else {
        throw new Error('Unsupported payment provider');
      }

      // Update payment status
      await supabase
        .from('mobile_money_payments')
        .update({
          status: paymentResult.success ? 'pending' : 'failed',
          provider_request_id: paymentResult.requestId,
          updated_at: new Date().toISOString()
        })
        .eq('id', payment.id);

      return new Response(JSON.stringify({
        success: paymentResult.success,
        message: paymentResult.message,
        paymentId: payment.id,
        requestId: paymentResult.requestId
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } catch (providerError) {
      // Update payment as failed
      await supabase
        .from('mobile_money_payments')
        .update({
          status: 'failed',
          updated_at: new Date().toISOString()
        })
        .eq('id', payment.id);

      throw providerError;
    }

  } catch (error) {
    console.error('Payment processing error:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Payment processing failed' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function processMpesaPayment(amount: number, phoneNumber: string, paymentId: string) {
  // Get M-Pesa access token
  const consumerKey = Deno.env.get('MPESA_CONSUMER_KEY');
  const consumerSecret = Deno.env.get('MPESA_CONSUMER_SECRET');
  const passkey = Deno.env.get('MPESA_PASSKEY');
  
  if (!consumerKey || !consumerSecret || !passkey) {
    throw new Error('M-Pesa credentials not configured');
  }

  const auth = btoa(`${consumerKey}:${consumerSecret}`);
  
  // Get access token
  const tokenResponse = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${auth}`
    }
  });

  if (!tokenResponse.ok) {
    throw new Error('Failed to get M-Pesa access token');
  }

  const tokenData = await tokenResponse.json();
  const accessToken = tokenData.access_token;

  // Initiate STK Push
  const timestamp = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 14);
  const businessShortCode = '174379'; // Sandbox shortcode
  const password = btoa(`${businessShortCode}${passkey}${timestamp}`);

  const stkPushResponse = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      BusinessShortCode: businessShortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: Math.round(amount),
      PartyA: phoneNumber,
      PartyB: businessShortCode,
      PhoneNumber: phoneNumber,
      CallBackURL: `${supabaseUrl}/functions/v1/mpesa-callback`,
      AccountReference: `ASKIE-${paymentId}`,
      TransactionDesc: 'Askie Wallet Top-up'
    })
  });

  const stkData = await stkPushResponse.json();

  if (stkData.ResponseCode === '0') {
    return {
      success: true,
      message: 'Payment request sent to your phone',
      requestId: stkData.CheckoutRequestID
    };
  } else {
    return {
      success: false,
      message: stkData.ResponseDescription || 'Payment request failed',
      requestId: null
    };
  }
}

async function processMtnMomoPayment(amount: number, phoneNumber: string, paymentId: string) {
  const apiKey = Deno.env.get('MTN_MOMO_API_KEY');
  const userId = Deno.env.get('MTN_MOMO_USER_ID');
  
  if (!apiKey || !userId) {
    throw new Error('MTN MoMo credentials not configured');
  }

  // Generate unique request ID
  const requestId = crypto.randomUUID();

  const response = await fetch('https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'X-Reference-Id': requestId,
      'X-Target-Environment': 'sandbox',
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': apiKey
    },
    body: JSON.stringify({
      amount: amount.toString(),
      currency: 'EUR', // Sandbox uses EUR
      externalId: paymentId,
      payer: {
        partyIdType: 'MSISDN',
        partyId: phoneNumber
      },
      payerMessage: 'Askie Wallet Top-up',
      payeeNote: `Payment for Askie wallet - ${paymentId}`
    })
  });

  if (response.ok || response.status === 202) {
    return {
      success: true,
      message: 'Payment request initiated successfully',
      requestId
    };
  } else {
    const errorData = await response.text();
    return {
      success: false,
      message: 'MTN MoMo payment request failed',
      requestId: null
    };
  }
}

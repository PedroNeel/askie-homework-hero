
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  subject: string;
  type: 'payment_success' | 'payment_failed' | 'homework_completed' | 'stars_earned' | 'family_update';
  data: any;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, type, data }: EmailRequest = await req.json();

    let htmlContent = '';

    switch (type) {
      case 'payment_success':
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #7c3aed;">🎉 Payment Successful!</h2>
            <p>Your Askie wallet has been topped up successfully.</p>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Amount:</strong> R${data.amount}</p>
              <p><strong>New Balance:</strong> R${data.newBalance}</p>
              <p><strong>Payment Method:</strong> ${data.provider}</p>
            </div>
            <p>Happy learning! 🚀</p>
          </div>
        `;
        break;

      case 'homework_completed':
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #7c3aed;">📚 Homework Completed!</h2>
            <p>Great job completing your homework question!</p>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Question:</strong> ${data.question}</p>
              <p><strong>Tier:</strong> ${data.tier}</p>
              ${data.starsEarned ? `<p><strong>Stars Earned:</strong> ⭐ ${data.starsEarned}</p>` : ''}
            </div>
            <p>Keep up the excellent work! 🌟</p>
          </div>
        `;
        break;

      case 'family_update':
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #7c3aed;">👨‍👩‍👧‍👦 Family Update</h2>
            <p>${data.studentName} has been active on Askie!</p>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Questions Asked:</strong> ${data.questionsCount}</p>
              <p><strong>Stars Earned:</strong> ⭐ ${data.starsEarned}</p>
              <p><strong>Last Activity:</strong> ${data.lastActivity}</p>
            </div>
            <p>Your child is making great progress! 🎓</p>
          </div>
        `;
        break;

      default:
        htmlContent = `<p>${data.message || 'Notification from Askie'}</p>`;
    }

    const emailResponse = await resend.emails.send({
      from: "Askie <notifications@lovable.app>",
      to: [to],
      subject: subject,
      html: htmlContent,
    });

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending notification email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});

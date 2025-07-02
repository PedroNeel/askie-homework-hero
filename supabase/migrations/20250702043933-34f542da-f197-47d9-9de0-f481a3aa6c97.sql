
-- Add mobile money provider information to wallet transactions
ALTER TABLE public.wallet_transactions 
ADD COLUMN provider TEXT,
ADD COLUMN provider_transaction_id TEXT,
ADD COLUMN phone_number TEXT,
ADD COLUMN status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled'));

-- Create a table for mobile money payment requests
CREATE TABLE public.mobile_money_payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  phone_number TEXT NOT NULL,
  provider TEXT NOT NULL CHECK (provider IN ('mpesa', 'mtn_momo', 'airtel_money')),
  provider_request_id TEXT,
  provider_transaction_id TEXT,
  status TEXT NOT NULL DEFAULT 'initiated' CHECK (status IN ('initiated', 'pending', 'completed', 'failed', 'cancelled', 'timeout')),
  callback_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for mobile money payments
ALTER TABLE public.mobile_money_payments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for mobile money payments
CREATE POLICY "Users can view their own mobile payments" ON public.mobile_money_payments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own mobile payments" ON public.mobile_money_payments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own mobile payments" ON public.mobile_money_payments
  FOR UPDATE USING (auth.uid() = user_id);

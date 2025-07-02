
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface UserWallet {
  balance: number;
  total_stars: number;
}

interface HomeworkSession {
  id: string;
  question: string;
  tier: string;
  ai_response: string;
  stars_earned: number;
  cost: number;
  created_at: string;
}

export const useUserData = () => {
  const { user } = useAuth();
  const [wallet, setWallet] = useState<UserWallet | null>(null);
  const [sessions, setSessions] = useState<HomeworkSession[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch user wallet data
  const fetchWallet = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_wallets')
        .select('balance, total_stars')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setWallet(data);
    } catch (error) {
      console.error('Error fetching wallet:', error);
    }
  };

  // Fetch user homework sessions
  const fetchSessions = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('homework_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setSessions(data || []);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  // Save homework session
  const saveHomeworkSession = async (
    question: string,
    tier: string,
    aiResponse: string,
    starsEarned: number,
    cost: number,
    imageUrl?: string
  ) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('homework_sessions')
        .insert({
          user_id: user.id,
          question,
          tier,
          ai_response: aiResponse,
          stars_earned: starsEarned,
          cost,
          image_url: imageUrl
        });

      if (error) throw error;
      
      // Refresh sessions
      await fetchSessions();
      toast.success('Homework session saved!');
    } catch (error) {
      console.error('Error saving session:', error);
      toast.error('Failed to save session');
    }
  };

  // Update wallet balance
  const updateWalletBalance = async (newBalance: number, starsToAdd: number = 0) => {
    if (!user || !wallet) return;

    try {
      const { error } = await supabase
        .from('user_wallets')
        .update({
          balance: newBalance,
          total_stars: wallet.total_stars + starsToAdd,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;
      
      setWallet({
        balance: newBalance,
        total_stars: wallet.total_stars + starsToAdd
      });
    } catch (error) {
      console.error('Error updating wallet:', error);
      toast.error('Failed to update wallet');
    }
  };

  // Add transaction record
  const addTransaction = async (
    amount: number,
    type: 'top_up' | 'payment' | 'refund',
    description?: string
  ) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('wallet_transactions')
        .insert({
          user_id: user.id,
          amount,
          transaction_type: type,
          description
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  useEffect(() => {
    if (user) {
      Promise.all([fetchWallet(), fetchSessions()]).finally(() => {
        setLoading(false);
      });
    } else {
      setWallet(null);
      setSessions([]);
      setLoading(false);
    }
  }, [user]);

  return {
    wallet,
    sessions,
    loading,
    saveHomeworkSession,
    updateWalletBalance,
    addTransaction,
    refreshData: () => {
      fetchWallet();
      fetchSessions();
    }
  };
};

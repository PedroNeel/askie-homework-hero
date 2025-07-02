
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface HomeworkRequest {
  question: string;
  tier: string;
  imageUrl?: string;
  userId: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question, tier, imageUrl, userId }: HomeworkRequest = await req.json();
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Determine the system prompt based on tier
    let systemPrompt = '';
    let temperature = 0.3;
    
    switch (tier) {
      case 'hint':
        systemPrompt = 'You are a helpful tutor providing brief hints for homework questions. Give concise guidance without revealing the full answer. Use emojis and keep responses under 100 words.';
        break;
      case 'walkthrough':
        systemPrompt = 'You are an expert tutor providing detailed step-by-step solutions. Break down the problem clearly, explain each step, and show the work. Use clear formatting and emojis to make it engaging.';
        break;
      case 'practice':
        systemPrompt = 'You are a comprehensive tutor. Provide the complete solution AND create 2-3 similar practice problems. Include study tips and explain key concepts. Award stars for effort!';
        temperature = 0.4;
        break;
    }

    // Prepare messages for OpenAI
    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: question }
    ];

    // If image is provided, include vision capabilities
    if (imageUrl) {
      messages[1] = {
        role: 'user',
        content: [
          { type: 'text', text: question || 'Please help me solve this problem from the image:' },
          { type: 'image_url', image_url: { url: imageUrl } }
        ]
      };
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: imageUrl ? 'gpt-4o' : 'gpt-4o-mini',
        messages,
        temperature,
        max_tokens: tier === 'hint' ? 200 : tier === 'walkthrough' ? 800 : 1200,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get AI response');
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Calculate stars earned based on tier
    let starsEarned = 0;
    if (tier === 'practice') {
      starsEarned = Math.floor(Math.random() * 3) + 1; // 1-3 stars
    }

    // Estimate reading time
    const wordCount = aiResponse.split(' ').length;
    const readingTime = Math.ceil(wordCount / 200); // 200 words per minute
    const timeEstimate = readingTime < 1 ? '30 seconds' : `${readingTime} minute${readingTime > 1 ? 's' : ''}`;

    return new Response(JSON.stringify({
      aiResponse,
      starsEarned,
      timeEstimate,
      wordCount
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in AI homework help:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to process homework question' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

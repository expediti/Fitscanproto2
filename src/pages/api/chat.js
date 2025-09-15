export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, conversationHistory = [] } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Build messages array for GLM-4.5-Flash
    let messages = [
      {
        role: 'system',
        content: `You are FitScan's advanced medical AI assistant. You have extensive medical knowledge and can:

- Discuss health topics, symptoms, and medical conditions in detail
- Ask relevant follow-up questions to understand patient concerns better  
- Provide general health advice and lifestyle recommendations
- Suggest when to see healthcare professionals or specialists
- Discuss medications, treatments, and medical procedures responsibly
- Explain medical terms in simple, understandable language
- Provide mental health support and guidance
- Offer preventive care recommendations

Always be empathetic, professional, and medically responsible. Remind users to consult healthcare professionals for serious concerns or emergencies. You can be conversational and supportive while maintaining medical accuracy.

For emergency symptoms (chest pain, difficulty breathing, severe injuries, etc.), always advise immediate medical attention.`
      }
    ];

    // Add conversation history (last 5 messages for context)
    if (conversationHistory.length > 0) {
      conversationHistory.slice(-5).forEach(msg => {
        messages.push({
          role: msg.isUser ? 'user' : 'assistant',
          content: msg.text
        });
      });
    }

    // Add current user message
    messages.push({
      role: 'user',
      content: message
    });

    // Call GLM-4.5-Flash API (FREE)
    const response = await fetch('https://api.z.ai/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.ZAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'glm-4.5-flash',
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
        top_p: 0.9,
        stream: false
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`GLM-4.5-Flash API error: ${response.status} - ${errorText}`);
      throw new Error(`GLM-4.5-Flash API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid response format:', data);
      throw new Error('Invalid response format from GLM-4.5-Flash');
    }

    let aiResponse = data.choices[0].message.content;

    // Clean up response
    aiResponse = aiResponse.trim();

    // Add medical disclaimer for serious topics
    const emergencyKeywords = ['serious', 'emergency', 'urgent', 'chest pain', 'difficulty breathing', 'severe pain', 'blood', 'unconscious'];
    const hasEmergencyContent = emergencyKeywords.some(keyword => 
      aiResponse.toLowerCase().includes(keyword) || message.toLowerCase().includes(keyword)
    );

    if (hasEmergencyContent) {
      aiResponse += '\n\n🚨 **Emergency Notice**: If you are experiencing severe symptoms, please call emergency services immediately or visit the nearest emergency room.';
    }

    // Add general medical disclaimer if not already included
    if (!aiResponse.includes('consult') && !aiResponse.includes('doctor') && !aiResponse.includes('healthcare')) {
      aiResponse += '\n\n💡 *Remember: This is general health information. Always consult with healthcare professionals for personalized medical advice.*';
    }

    return res.status(200).json({ 
      response: aiResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('GLM-4.5-Flash Chat API Error:', error);

    // Provide helpful error messages based on error type
    let errorMessage = 'I apologize, but I\'m experiencing some technical difficulties. Please try again in a moment.';
    
    if (error.message.includes('401')) {
      errorMessage = 'API authentication error. Please contact support if this persists.';
    } else if (error.message.includes('429')) {
      errorMessage = 'I\'m receiving too many requests right now. Please wait a moment and try again.';
    } else if (error.message.includes('timeout')) {
      errorMessage = 'The request timed out. Please try again with a shorter message.';
    } else if (error.message.includes('500')) {
      errorMessage = 'The AI service is temporarily unavailable. Please try again in a few minutes.';
    }

    return res.status(500).json({ 
      error: 'Failed to get AI response',
      response: errorMessage 
    });
  }
}

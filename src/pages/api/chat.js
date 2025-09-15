export default async function handler(req, res) {
  // Handle CORS
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
    // Build conversation context
    let messages = [
      {
        role: 'system',
        content: `You are FitScan's expert medical AI assistant. You provide:

- Detailed health analysis and symptom assessment
- Medical advice based on current medical knowledge  
- Treatment recommendations and lifestyle suggestions
- Emergency guidance when symptoms are serious
- Mental health support and wellness tips
- Medicine and supplement information
- Preventive care recommendations

Always be empathetic, professional, and thorough. For serious symptoms, advise immediate medical attention. You can discuss medications, treatments, and provide comprehensive health guidance.`
      }
    ];

    // Add conversation history (last 5 messages)
    if (conversationHistory.length > 0) {
      conversationHistory.slice(-5).forEach(msg => {
        messages.push({
          role: msg.isUser ? 'user' : 'assistant',
          content: msg.text
        });
      });
    }

    // Add current message
    messages.push({
      role: 'user',
      content: message
    });

    // Call GLM-4.5-Flash API (100% FREE!)
    const response = await fetch('https://api.z.ai/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.ZAI_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept-Language': 'en-US,en'
      },
      body: JSON.stringify({
        model: 'glm-4.5-flash',  // FREE model!
        messages: messages,
        max_tokens: 1500,
        temperature: 0.8,
        top_p: 0.9,
        stream: false
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Z.AI API Error: ${response.status} - ${errorText}`);
      throw new Error(`Z.AI API Error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid response format:', data);
      throw new Error('Invalid response from Z.AI');
    }

    let aiResponse = data.choices[0].message.content.trim();

    // Add medical disclaimers for safety
    const emergencyKeywords = ['chest pain', 'difficulty breathing', 'severe pain', 'emergency', 'urgent', 'blood', 'unconscious', 'stroke', 'heart attack'];
    const hasEmergency = emergencyKeywords.some(keyword => 
      aiResponse.toLowerCase().includes(keyword) || message.toLowerCase().includes(keyword)
    );

    if (hasEmergency) {
      aiResponse += '\n\n🚨 **EMERGENCY NOTICE**: If you are experiencing severe symptoms, please call emergency services (911/999) immediately or visit your nearest emergency room.';
    }

    // Add general medical disclaimer
    if (!aiResponse.includes('healthcare professional') && !aiResponse.includes('doctor')) {
      aiResponse += '\n\n💡 *Important: This is AI-generated health information. Always consult with healthcare professionals for personalized medical advice and diagnosis.*';
    }

    return res.status(200).json({ 
      response: aiResponse,
      model: 'glm-4.5-flash',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('GLM-4.5-Flash API Error:', error);

    // Provide specific error messages
    let errorMessage = 'I apologize, but I\'m experiencing technical difficulties. Please try again in a moment.';
    
    if (error.message.includes('401')) {
      errorMessage = 'API authentication failed. Please check if the API key is configured correctly.';
    } else if (error.message.includes('429')) {
      errorMessage = 'Too many requests. Please wait a moment and try again.';
    } else if (error.message.includes('500')) {
      errorMessage = 'Z.AI service is temporarily unavailable. Please try again in a few minutes.';
    }

    return res.status(500).json({ 
      error: 'Failed to get AI response',
      response: errorMessage 
    });
  }
}

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

  // Check if API key exists
  if (!process.env.ZAI_API_KEY) {
    console.error('ZAI_API_KEY environment variable is not set');
    return res.status(500).json({
      response: 'AI service is not configured. Please contact support if this issue persists.'
    });
  }

  try {
    // Build conversation context
    let messages = [
      {
        role: 'system',
        content: `You are FitScan's expert medical AI assistant. You provide comprehensive health guidance including:

- Detailed symptom analysis and possible causes
- Treatment recommendations and next steps
- Medication information and interactions
- Lifestyle and preventive care advice
- Mental health support
- Emergency guidance when symptoms are serious

Always be empathetic, thorough, and professional. Provide detailed explanations. For serious symptoms, always advise consulting healthcare professionals immediately.`
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

    // Add current message
    messages.push({
      role: 'user',
      content: message
    });

    console.log('Calling GLM-4.5-Flash API...');

    // Call GLM-4.5-Flash API
    const response = await fetch('https://api.z.ai/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.ZAI_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        model: 'glm-4.5-flash',
        messages: messages,
        max_tokens: 2000,
        temperature: 0.7,
        top_p: 0.9,
        stream: false
      }),
      timeout: 30000 // 30 second timeout
    });

    console.log('API Response Status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`GLM-4.5-Flash API Error: ${response.status} - ${errorText}`);
      
      // Handle specific error codes
      if (response.status === 401) {
        return res.status(500).json({
          response: 'API authentication failed. The AI service is currently unavailable. Please try again later or contact support.'
        });
      } else if (response.status === 429) {
        return res.status(500).json({
          response: 'The AI service is currently experiencing high demand. Please wait a moment and try again.'
        });
      } else if (response.status === 500) {
        return res.status(500).json({
          response: 'The AI service is temporarily down for maintenance. Please try again in a few minutes.'
        });
      }
      
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response received');

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid API response format:', data);
      throw new Error('Invalid response format from GLM-4.5-Flash');
    }

    let aiResponse = data.choices[0].message.content;

    if (!aiResponse || aiResponse.trim().length === 0) {
      throw new Error('Empty response from AI');
    }

    // Clean up the response
    aiResponse = aiResponse.trim();

    // Add medical disclaimers for safety
    const emergencyKeywords = ['chest pain', 'difficulty breathing', 'severe pain', 'emergency', 'urgent', 'blood', 'unconscious', 'stroke', 'heart attack', 'suicide', 'overdose'];
    const hasEmergency = emergencyKeywords.some(keyword => 
      aiResponse.toLowerCase().includes(keyword) || message.toLowerCase().includes(keyword)
    );

    if (hasEmergency) {
      aiResponse += '\n\n🚨 **EMERGENCY NOTICE**: If you are experiencing severe symptoms or this is a medical emergency, please call emergency services (911/999) immediately or visit your nearest emergency room.';
    }

    // Add general medical disclaimer if not already included
    if (!aiResponse.includes('healthcare professional') && !aiResponse.includes('doctor') && !aiResponse.includes('medical professional')) {
      aiResponse += '\n\n💡 *Important: This is AI-generated health information for educational purposes. Always consult with qualified healthcare professionals for personalized medical advice and diagnosis.*';
    }

    return res.status(200).json({
      response: aiResponse,
      model: 'glm-4.5-flash',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('GLM-4.5-Flash API Error:', error);

    // Provide helpful error messages based on error type
    let errorMessage = 'I apologize, but I\'m experiencing technical difficulties connecting to the AI service. Please try again in a moment.';
    
    if (error.message.includes('timeout')) {
      errorMessage = 'The AI service is taking longer than usual to respond. Please try asking your question again.';
    } else if (error.message.includes('network') || error.message.includes('fetch')) {
      errorMessage = 'There\'s a temporary network issue. Please check your connection and try again.';
    } else if (error.message.includes('401')) {
      errorMessage = 'The AI service authentication has failed. Please contact support if this persists.';
    } else if (error.message.includes('429')) {
      errorMessage = 'The AI service is currently busy. Please wait a moment and try again.';
    }

    return res.status(500).json({
      error: 'Failed to get AI response',
      response: errorMessage
    });
  }
}

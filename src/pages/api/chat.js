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
  if (!process.env.ZHIPU_API_KEY) {
    console.error('ZHIPU_API_KEY environment variable is not set');
    return res.status(500).json({
      response: '🔧 **DEBUG**: API key is missing. Please add ZHIPU_API_KEY to Vercel environment variables.'
    });
  }

  try {
    // Build conversation exactly like the official example
    let messages = [
      {
        role: 'user',
        content: `You are FitScan's expert medical AI assistant. Please provide comprehensive health guidance for this question: ${message}`
      }
    ];

    // Add conversation history if exists
    if (conversationHistory.length > 0) {
      // Reset messages with proper conversation flow
      messages = [];
      
      // Add system context as first user message
      messages.push({
        role: 'user',
        content: 'You are FitScan\'s expert medical AI assistant. Provide detailed, empathetic health guidance including symptom analysis, treatment recommendations, and when to seek emergency care.'
      });

      // Add conversation history
      conversationHistory.slice(-4).forEach(msg => {
        messages.push({
          role: msg.isUser ? 'user' : 'assistant',
          content: msg.text
        });
      });

      // Add current message
      messages.push({
        role: 'user',
        content: message
      });
    }

    console.log('Calling BigModel GLM-4.5 API...');
    console.log('API Key length:', process.env.ZHIPU_API_KEY.length);

    // Call BigModel API with EXACT format from screenshot
    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ZHIPU_API_KEY}`
      },
      body: JSON.stringify({
        model: 'glm-4.5',  // EXACT model name from screenshot
        messages: messages,
        max_tokens: 4096,  // EXACT value from screenshot
        temperature: 0.6   // EXACT value from screenshot
      })
    });

    console.log('BigModel API Response Status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`BigModel API Error: ${response.status} - ${errorText}`);
      
      // Detailed error handling
      if (response.status === 401) {
        return res.status(500).json({
          response: `🚨 **API KEY ERROR**: Authentication failed (401). 
          
Your API key might be invalid. Please:
1. Go to BigModel dashboard
2. Copy the FULL API key (starts with your current: d788...c7Bx)
3. Add it to Vercel as ZHIPU_API_KEY
4. Redeploy

Current API key length: ${process.env.ZHIPU_API_KEY.length} characters`
        });
      } else if (response.status === 429) {
        return res.status(500).json({
          response: 'Rate limit exceeded. Please wait a moment and try again.'
        });
      } else if (response.status === 400) {
        return res.status(500).json({
          response: `Bad Request (400): ${errorText}`
        });
      }
      
      return res.status(500).json({
        response: `API Error ${response.status}: ${errorText}`
      });
    }

    const data = await response.json();
    console.log('BigModel API Success!');

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid API response format:', data);
      return res.status(500).json({
        response: `⚠️ Invalid response format: ${JSON.stringify(data)}`
      });
    }

    let aiResponse = data.choices[0].message.content;

    if (!aiResponse || aiResponse.trim().length === 0) {
      return res.status(500).json({
        response: '⚠️ Empty response from AI. Please try again.'
      });
    }

    // Clean up the response
    aiResponse = aiResponse.trim();

    // Add emergency warnings for serious symptoms
    const emergencyKeywords = ['chest pain', 'difficulty breathing', 'severe pain', 'emergency', 'urgent', 'blood', 'unconscious', 'stroke', 'heart attack'];
    const hasEmergency = emergencyKeywords.some(keyword => 
      aiResponse.toLowerCase().includes(keyword) || message.toLowerCase().includes(keyword)
    );

    if (hasEmergency) {
      aiResponse += '\n\n🚨 **EMERGENCY NOTICE**: If you are experiencing severe symptoms or this is a medical emergency, please call emergency services (911/999) immediately or visit your nearest emergency room.';
    }

    // Add medical disclaimer
    aiResponse += '\n\n💡 *Important: This is AI-generated health information for educational purposes. Always consult with qualified healthcare professionals for personalized medical advice and diagnosis.*';

    return res.status(200).json({
      response: aiResponse,
      model: 'GLM-4.5 (BigModel)',
      timestamp: new Date().toISOString(),
      debug: {
        apiKeySet: true,
        responseLength: aiResponse.length,
        success: true
      }
    });

  } catch (error) {
    console.error('BigModel API Error:', error);

    return res.status(500).json({
      response: `💥 **UNEXPECTED ERROR**: ${error.message}

Please try again. If the error persists, the API service might be temporarily unavailable.`
    });
  }
}

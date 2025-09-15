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

  // Debug: Check if API key exists
  const apiKeyExists = !!process.env.ZAI_API_KEY;
  const apiKeyLength = process.env.ZAI_API_KEY ? process.env.ZAI_API_KEY.length : 0;
  
  console.log('=== API DEBUG ===');
  console.log('API Key exists:', apiKeyExists);
  console.log('API Key length:', apiKeyLength);
  console.log('Message received:', message);

  if (!process.env.ZAI_API_KEY) {
    return res.status(500).json({
      response: `🔧 **DEBUG**: API key is missing from environment variables. 
      
Please add ZAI_API_KEY to Vercel environment variables:
1. Go to Vercel Dashboard → Settings → Environment Variables  
2. Add: ZAI_API_KEY = e588c5f234cd43a8b6ecbede8b1b1d60.rr2LO5reBjaC7YnM
3. Redeploy the project

Current status: API key exists = ${apiKeyExists}, length = ${apiKeyLength}`
    });
  }

  try {
    console.log('Attempting API call to GLM-4.5-Flash...');

    const response = await fetch('https://api.z.ai/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.ZAI_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        model: 'glm-4.5-flash',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful medical AI assistant. Provide detailed, empathetic health guidance.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
        stream: false
      })
    });

    console.log('API Response Status:', response.status);
    console.log('API Response Headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      
      return res.status(500).json({
        response: `🚨 **API ERROR**: 
        
Status: ${response.status}
Error: ${errorText}

This suggests the API key might be invalid or expired. Please check:
1. API key is correctly set in Vercel environment variables
2. API key is valid and active
3. Try getting a new API key from z.ai if needed

Debug info: Response status = ${response.status}`
      });
    }

    const data = await response.json();
    console.log('API Success! Response received');

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid response format:', data);
      return res.status(500).json({
        response: `⚠️ **RESPONSE ERROR**: Got response from API but format is invalid.
        
Response data: ${JSON.stringify(data, null, 2)}`
      });
    }

    let aiResponse = data.choices[0].message.content.trim();

    // Add emergency notice for chest pain
    if (message.toLowerCase().includes('chest pain')) {
      aiResponse += '\n\n🚨 **EMERGENCY NOTICE**: Chest pain can be serious. If you are experiencing severe chest pain, difficulty breathing, or other concerning symptoms, please call emergency services (911) immediately or visit your nearest emergency room.';
    }

    // Add disclaimer
    aiResponse += '\n\n💡 *This is AI-generated health information. Always consult healthcare professionals for personalized medical advice.*';

    return res.status(200).json({
      response: aiResponse,
      model: 'glm-4.5-flash',
      timestamp: new Date().toISOString(),
      debug: {
        apiKeySet: true,
        messageLength: message.length,
        success: true
      }
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    
    return res.status(500).json({
      response: `💥 **UNEXPECTED ERROR**: ${error.message}
      
Stack: ${error.stack}

This is likely a network or API issue. Please try again in a moment.`
    });
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Replace this with actual GLM-4.5-Flash API call
    const response = await fetch('https://api.z.ai/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.ZAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'glm-4.5-flash',
        messages: [
          {
            role: 'system',
            content: 'You are FitScan\'s medical AI assistant. Provide helpful, accurate health information while being empathetic and professional.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content.trim();

    return res.status(200).json({ response: aiResponse });

  } catch (error) {
    console.error('Chat API Error:', error);
    return res.status(500).json({ 
      response: 'I apologize, but I\'m experiencing some technical difficulties. Please try again in a moment.' 
    });
  }
}

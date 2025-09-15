export default async function handler(req, res) {
  // --- CORS setup ---
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
    // --- Build conversation context ---
    let messages = [
      {
        role: 'system',
        content: "You are FitScan's medical AI assistant. Give clear, concise answers (3–4 sentences max). Avoid long paragraphs. Always include a disclaimer."
      }
    ];

    // Add last 3 messages for context
    conversationHistory.slice(-3).forEach(msg => {
      messages.push({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.text
      });
    });

    // Add the new user message
    messages.push({ role: 'user', content: message });

    // --- Call Zhipu GLM API ---
    const response = await fetch('https://api.z.ai/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.ZAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'glm-4.5-flash',
        messages,
        max_tokens: 300,   // shorter replies
        temperature: 0.5,  // less rambling
        top_p: 0.9,
        stream: false
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("❌ Zhipu API error:", response.status, errText);
      return res.status(500).json({ error: "Failed to get AI response from Zhipu API" });
    }

    const data = await response.json();
    console.log("✅ Zhipu API raw response:", JSON.stringify(data, null, 2));

    // --- Handle response formats ---
    let aiResponse = "";
    if (data.choices?.[0]?.message?.content) {
      aiResponse = data.choices[0].message.content;
    } else if (data.output_text) {
      aiResponse = data.output_text;
    } else {
      aiResponse = "⚠️ AI returned an unexpected format.";
    }

    // --- Add disclaimer ---
    aiResponse += "\n\n💡 *Disclaimer: This is AI-generated health information. Always consult a qualified doctor for medical advice.*";

    // --- Send back to frontend ---
    return res.status(200).json({
      response: aiResponse,
      model: 'GLM-4.5-Flash',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("🔥 Chat API Error:", error);
    return res.status(500).json({
      error: "Internal server error",
      response: "Sorry, the AI is temporarily unavailable. Please try again later."
    });
  }
}

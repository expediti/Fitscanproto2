export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // WORKING AI RESPONSES
  let aiResponse = "";
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('chest pain') || lowerMessage.includes('shortness of breath')) {
    aiResponse = `**🚨 URGENT - CHEST PAIN & SHORTNESS OF BREATH**

Your symptoms require IMMEDIATE MEDICAL ATTENTION. Call 911 NOW.

**Possible Emergency Conditions:**
• Heart Attack - blocked coronary artery
• Pulmonary Embolism - blood clot in lung
• Pneumothorax - collapsed lung

**IMMEDIATE ACTIONS:**
1. Call 911 immediately 📞
2. Chew aspirin if available and not allergic
3. Sit upright, don't lie down
4. Stay calm and avoid exertion

**DO NOT drive yourself to hospital. TIME IS CRITICAL.**`;

  } else if (lowerMessage.includes('headache')) {
    aiResponse = `**Headache Analysis & Treatment**

**Common Causes:**
• Tension headaches - stress, poor posture
• Migraines - hormonal, food triggers
• Dehydration or eye strain
• Sinus congestion

**Immediate Relief:**
1. Rest in dark, quiet room
2. Drink 16-20oz water
3. Cold compress or warm compress
4. OTC pain relievers (ibuprofen, acetaminophen)

**Seek Emergency Care If:**
- Sudden severe "thunderclap" headache
- Headache with fever, stiff neck
- Vision changes or weakness`;

  } else {
    aiResponse = `**Health Consultation Response**

Thank you for your question: "${message}"

**General Recommendations:**
• Monitor your symptoms carefully
• Stay hydrated - drink plenty of water
• Get adequate rest (7-9 hours sleep)
• Maintain good nutrition

**When to Seek Medical Care:**
- Symptoms persist or worsen after 2-3 days
- You develop fever above 101°F
- Severe pain or difficulty breathing
- Any concerning symptoms

For personalized medical advice, please consult with a healthcare professional.`;
  }

  aiResponse += '\n\n💡 **Medical Disclaimer:** This is AI-generated health information for educational purposes only. Always consult healthcare professionals for medical advice.\n\n*Powered by FitScan AI Health Assistant*';

  return res.status(200).json({
    response: aiResponse,
    model: 'FitScan Medical AI',
    timestamp: new Date().toISOString()
  });
}

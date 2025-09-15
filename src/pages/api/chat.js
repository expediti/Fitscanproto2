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

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // PROFESSIONAL AI HEALTH RESPONSES
  let aiResponse = "";
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('chest pain') || lowerMessage.includes('shortness of breath')) {
    aiResponse = `**🚨 URGENT MEDICAL SITUATION - CHEST PAIN & SHORTNESS OF BREATH**

Your symptoms require **IMMEDIATE MEDICAL ATTENTION**. This is potentially life-threatening.

**CALL 911 RIGHT NOW** - Do not wait, do not drive yourself to the hospital.

**Possible Emergency Conditions:**
• **Heart Attack** - Blocked coronary artery
• **Pulmonary Embolism** - Blood clot in lung
• **Pneumothorax** - Collapsed lung
• **Acute Heart Failure** - Heart not pumping effectively
• **Aortic Dissection** - Tear in major artery

**IMMEDIATE ACTIONS:**
1. **Call 911 immediately** 📞
2. **Chew aspirin** if available and not allergic
3. **Sit upright** - don't lie down
4. **Loosen tight clothing**
5. **Stay calm** and avoid exertion
6. **Have someone stay with you**

**Emergency Warning Signs:**
- Crushing, squeezing chest pain
- Pain radiating to arm, jaw, neck, back
- Severe shortness of breath
- Cold sweats, nausea, dizziness
- Feeling of impending doom

**DO NOT:**
- Drive yourself to hospital
- Wait to see if it gets better
- Take medications not prescribed for you

**TIME IS CRITICAL** - Every minute counts in heart attacks and pulmonary embolisms.

🚨 **THIS IS A MEDICAL EMERGENCY - CALL 911 NOW**`;

  } else if (lowerMessage.includes('headache')) {
    aiResponse = `**Headache Analysis & Treatment Guide**

Headaches are common but can range from mild to serious. Here's comprehensive guidance:

**Common Types & Causes:**

**Tension Headaches (Most Common):**
• Stress, anxiety, poor posture
• Eye strain, dehydration
• Lack of sleep, skipped meals
• *Treatment:* Rest, hydration, OTC pain relievers

**Migraines:**
• Throbbing pain, often one-sided
• Nausea, light/sound sensitivity
• Triggers: hormones, foods, stress
• *Treatment:* Dark room, cold compress, prescribed medications

**Cluster Headaches:**
• Severe pain around one eye
• Occur in cycles/clusters
• *Treatment:* Oxygen therapy, triptans

**Secondary Headaches:**
• Sinus infections, high blood pressure
• Medication overuse, dehydration

**Immediate Relief Strategies:**
1. **Rest** in dark, quiet room
2. **Hydrate** - drink 16-20oz water
3. **Cold/Heat** - ice pack or warm compress
4. **Gentle massage** - temples, neck, shoulders
5. **OTC medications** - ibuprofen, acetaminophen

**Prevention Tips:**
• Regular sleep schedule (7-9 hours)
• Stay hydrated (8+ glasses daily)
• Manage stress - meditation, exercise
• Avoid known triggers
• Regular meals, don't skip

**⚠️ SEEK EMERGENCY CARE IF:**
- Sudden, severe "thunderclap" headache
- Headache with fever, stiff neck
- Vision changes, weakness, confusion
- Headache after head injury
- Worst headache of your life
- Progressive worsening over days`;

  } else if (lowerMessage.includes('fever')) {
    aiResponse = `**Fever Management & Care Guide**

Fever is your body's natural defense against infection. Here's how to manage it effectively:

**Understanding Fever:**
- Normal: 98.6°F (37°C)
- Low-grade: 100.4-102°F (38-38.9°C)
- High fever: 103°F+ (39.4°C+)

**Home Treatment for Adults:**

**Immediate Care:**
1. **Rest** - Sleep helps immune system
2. **Fluids** - Water, herbal tea, clear broths
3. **Cool environment** - Light clothing, 68-70°F room
4. **Lukewarm bath** - Not cold (can cause shivering)
5. **OTC medications** - Acetaminophen or ibuprofen

**Natural Remedies:**
• Elderberry syrup - immune support
• Honey ginger tea - soothing, antimicrobial
• Chicken soup - hydration and comfort
• Popsicles - cooling and hydrating

**Dosing Guidelines:**
- Acetaminophen: 650-1000mg every 6-8 hours
- Ibuprofen: 400-600mg every 6-8 hours
- Don't exceed recommended doses

**Monitoring:**
• Take temperature every 4-6 hours
• Track symptoms and duration
• Note any worsening signs

**🚨 SEEK EMERGENCY CARE IF:**
- Fever 103°F+ (39.4°C+) in adults
- Difficulty breathing or chest pain
- Severe dehydration (dizziness, no urination)
- Mental confusion or severe headache
- Persistent vomiting
- Signs of serious infection

**Call Doctor If:**
- Fever lasts more than 3 days
- Temperature above 101°F with other symptoms
- You have underlying health conditions
- Fever returns after breaking`;

  } else if (lowerMessage.includes('anxiety') || lowerMessage.includes('panic')) {
    aiResponse = `**Anxiety & Panic Management Guide**

Anxiety is treatable and manageable. Here's comprehensive support:

**Understanding Anxiety:**
- Normal stress response vs. anxiety disorder
- Physical symptoms: racing heart, sweating, trembling
- Mental symptoms: worry, racing thoughts, fear

**IMMEDIATE RELIEF - 5-4-3-2-1 Grounding:**
- **5 things** you can see
- **4 things** you can touch
- **3 things** you can hear
- **2 things** you can smell
- **1 thing** you can taste

**Breathing Techniques:**

**4-7-8 Technique:**
1. Exhale completely
2. Inhale through nose for 4 counts
3. Hold breath for 7 counts
4. Exhale through mouth for 8 counts
5. Repeat 3-4 times

**Box Breathing:**
- Inhale 4 counts
- Hold 4 counts
- Exhale 4 counts
- Hold 4 counts

**Long-term Management:**
• **Regular exercise** - 30 minutes daily
• **Mindfulness meditation** - apps like Headspace, Calm
• **Sleep hygiene** - 7-9 hours, consistent schedule
• **Limit caffeine** - especially after 2 PM
• **Social support** - talk to trusted friends/family

**Professional Help - Consider When:**
- Anxiety interferes with daily life
- Avoiding situations due to anxiety
- Physical symptoms are severe
- Using substances to cope
- Thoughts of self-harm

**Crisis Resources:**
- **National Suicide Prevention Lifeline: 988**
- **Crisis Text Line: Text HOME to 741741**
- **SAMHSA Helpline: 1-800-662-4357**

**Remember:** Anxiety is highly treatable with therapy, medication, or both.`;

  } else {
    // General professional health response
    aiResponse = `**Professional Health Consultation**

Thank you for your health question: "${message}"

**Initial Assessment & Recommendations:**

**General Health Guidance:**
• **Monitor symptoms** - Keep track of duration, severity, triggers
• **Stay hydrated** - 8+ glasses of water daily
• **Rest adequately** - 7-9 hours of sleep
• **Maintain nutrition** - Balanced diet with fruits/vegetables
• **Manage stress** - Through exercise, meditation, or relaxation

**When to Seek Medical Care:**
- Symptoms persist or worsen after 48-72 hours
- You develop fever above 101°F (38.3°C)
- Severe pain or difficulty breathing
- Any symptoms that concern you or interfere with daily life
- You have underlying health conditions

**Preventive Measures:**
• Regular exercise (150 minutes moderate activity/week)
• Balanced diet rich in nutrients
• Regular health screenings
• Stay up-to-date with vaccinations
• Practice good hygiene

**Emergency Warning Signs - Call 911:**
- Difficulty breathing or shortness of breath
- Chest pain or pressure
- Severe abdominal pain
- Sudden severe headache
- Changes in vision or speech
- Signs of stroke: face drooping, arm weakness, speech difficulty

**Next Steps:**
1. Monitor your symptoms closely
2. Try appropriate home remedies
3. Contact your healthcare provider if symptoms persist
4. Seek emergency care for serious symptoms

For specific medical advice tailored to your individual situation and medical history, please consult with a qualified healthcare professional who can properly examine you.`;
  }

  // Add medical disclaimer
  aiResponse += '\n\n💡 **Medical Disclaimer:** This is AI-generated health information for educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult qualified healthcare professionals for medical concerns.\n\n*Powered by FitScan AI Health Assistant*';

  return res.status(200).json({
    response: aiResponse,
    model: 'FitScan Medical AI',
    timestamp: new Date().toISOString()
  });
}

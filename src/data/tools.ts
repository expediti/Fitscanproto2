export interface Option {
  id: string;
  text: string;
  value: number;
  description?: string;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
}

export interface HealthTool {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Advanced";
  estimatedTime: string;
  icon: string;
  questions: Question[];
  recommendations?: {
    low: {
      title: string;
      advice: string;
      suggestions: string[];
    };
    moderate: {
      title: string;
      advice: string;
      suggestions: string[];
    };
    high: {
      title: string;
      advice: string;
      suggestions: string[];
    };
  };
}

export const categories = [
  "All",
  "Heart Health",
  "Mental Health",
  "Metabolic Health",
  "Respiratory",
  "Digestive",
  "General Health",
  "Women's Health",
  "Neurological",
  "Infectious Disease"
];

export const healthTools: HealthTool[] = [
  {
    id: "anxiety-checker",
    title: "Anxiety Assessment",
    description: "Comprehensive evaluation of anxiety symptoms and their impact on daily life",
    category: "Mental Health",
    difficulty: "Easy",
    estimatedTime: "6-8 min",
    icon: "🧠",
    questions: [
      {
        id: "worry_frequency",
        text: "How often do you feel nervous, anxious, or on edge?",
        options: [
          { id: "opt1", text: "Not at all", value: 0 },
          { id: "opt2", text: "Several days", value: 1 },
          { id: "opt3", text: "More than half the days", value: 2 },
          { id: "opt4", text: "Nearly every day", value: 3 }
        ]
      },
      {
        id: "worry_control",
        text: "How often do you have trouble stopping or controlling worrying?",
        options: [
          { id: "opt1", text: "Not at all", value: 0 },
          { id: "opt2", text: "Several days", value: 1 },
          { id: "opt3", text: "More than half the days", value: 2 },
          { id: "opt4", text: "Nearly every day", value: 3 }
        ]
      },
      {
        id: "restlessness",
        text: "How often do you feel restless, so that it's hard to sit still?",
        options: [
          { id: "opt1", text: "Not at all", value: 0 },
          { id: "opt2", text: "Several days", value: 1 },
          { id: "opt3", text: "More than half the days", value: 2 },
          { id: "opt4", text: "Nearly every day", value: 3 }
        ]
      },
      {
        id: "physical_symptoms",
        text: "Do you experience physical symptoms like rapid heartbeat, sweating, or trembling?",
        options: [
          { id: "opt1", text: "Never", value: 0 },
          { id: "opt2", text: "Occasionally", value: 1 },
          { id: "opt3", text: "Frequently", value: 2 },
          { id: "opt4", text: "Almost constantly", value: 3 }
        ]
      },
      {
        id: "sleep_problems",
        text: "How often do anxiety or worry affect your sleep?",
        options: [
          { id: "opt1", text: "Sleep normally", value: 0 },
          { id: "opt2", text: "Occasional sleep problems", value: 1 },
          { id: "opt3", text: "Frequent difficulty falling or staying asleep", value: 2 },
          { id: "opt4", text: "Severe sleep disruption almost nightly", value: 3 }
        ]
      },
      {
        id: "concentration",
        text: "How often do you have trouble concentrating due to anxiety?",
        options: [
          { id: "opt1", text: "No concentration problems", value: 0 },
          { id: "opt2", text: "Occasional difficulty", value: 1 },
          { id: "opt3", text: "Frequent concentration problems", value: 2 },
          { id: "opt4", text: "Severe difficulty focusing on tasks", value: 3 }
        ]
      },
      {
        id: "avoidance",
        text: "Do you avoid certain situations or places due to anxiety?",
        options: [
          { id: "opt1", text: "No avoidance", value: 0 },
          { id: "opt2", text: "Avoid one or two specific situations", value: 1 },
          { id: "opt3", text: "Avoid multiple situations regularly", value: 2 },
          { id: "opt4", text: "Severely limited by avoidance behaviors", value: 3 }
        ]
      },
      {
        id: "panic_attacks",
        text: "Do you experience panic attacks (sudden intense fear with physical symptoms)?",
        options: [
          { id: "opt1", text: "Never", value: 0 },
          { id: "opt2", text: "Rarely (once or twice)", value: 1 },
          { id: "opt3", text: "Occasionally (monthly)", value: 2 },
          { id: "opt4", text: "Frequently (weekly or more)", value: 3 }
        ]
      }
    ],
    recommendations: {
      low: {
        title: "Low Anxiety - Great Mental Health!",
        advice: "Your anxiety levels appear manageable. Continue these wellness practices:",
        suggestions: [
          "Maintain regular sleep schedule (7-9 hours nightly)",
          "Practice stress-reduction techniques (meditation, deep breathing)",
          "Stay physically active to boost mood",
          "Maintain social connections and support networks",
          "Limit caffeine and alcohol consumption",
          "Practice mindfulness and gratitude",
          "Keep up with hobbies and activities you enjoy"
        ]
      },
      moderate: {
        title: "Moderate Anxiety - Consider Support",
        advice: "You may be experiencing noticeable anxiety. Consider these helpful strategies:",
        suggestions: [
          "Try relaxation techniques (progressive muscle relaxation, yoga)",
          "Consider counseling or therapy (cognitive behavioral therapy)",
          "Practice regular exercise to reduce anxiety",
          "Join a support group or talk to trusted friends/family",
          "Limit news and social media if they increase anxiety",
          "Consider apps for guided meditation and stress management",
          "Discuss with your primary care doctor if symptoms persist"
        ]
      },
      high: {
        title: "High Anxiety - Seek Professional Help",
        advice: "Your results suggest significant anxiety that may benefit from professional treatment:",
        suggestions: [
          "Schedule an appointment with a mental health professional immediately",
          "Consider therapy (CBT, EMDR, or other evidence-based treatments)",
          "Discuss medication options with a psychiatrist if needed",
          "Create a safety plan for managing severe anxiety episodes",
          "Build a strong support network of family and friends",
          "Consider intensive outpatient programs if available",
          "Practice crisis management techniques and know when to seek emergency help"
        ]
      }
    }
  },
  {
    id: "asthma-checker",
    title: "Asthma Symptom Checker",
    description: "Comprehensive assessment of respiratory symptoms that might indicate asthma or breathing difficulties",
    category: "Respiratory",
    difficulty: "Easy",
    estimatedTime: "6-8 min",
    icon: "🫁",
    questions: [
      {
        id: "wheezing",
        text: "Do you experience wheezing or whistling sounds when breathing?",
        options: [
          { id: "opt1", text: "Never", value: 0 },
          { id: "opt2", text: "Occasionally", value: 1 },
          { id: "opt3", text: "Frequently", value: 2 },
          { id: "opt4", text: "Daily or with most activities", value: 3 }
        ]
      },
      {
        id: "persistent_cough",
        text: "How often do you have a persistent cough, especially at night?",
        options: [
          { id: "opt1", text: "Never", value: 0 },
          { id: "opt2", text: "Occasionally", value: 1 },
          { id: "opt3", text: "Several times a week", value: 2 },
          { id: "opt4", text: "Daily or nightly", value: 3 }
        ]
      },
      {
        id: "shortness_breath",
        text: "Do you experience shortness of breath during activities?",
        options: [
          { id: "opt1", text: "Never", value: 0 },
          { id: "opt2", text: "Only during intense exercise", value: 1 },
          { id: "opt3", text: "During moderate activities", value: 2 },
          { id: "opt4", text: "During light activities or at rest", value: 3 }
        ]
      },
      {
        id: "chest_tightness",
        text: "Do you feel chest tightness or pressure?",
        options: [
          { id: "opt1", text: "Never", value: 0 },
          { id: "opt2", text: "Occasionally", value: 1 },
          { id: "opt3", text: "Frequently", value: 2 },
          { id: "opt4", text: "Daily or constant", value: 3 }
        ]
      },
      {
        id: "triggers",
        text: "Do certain triggers (allergens, exercise, cold air) worsen your breathing?",
        options: [
          { id: "opt1", text: "No triggers identified", value: 0 },
          { id: "opt2", text: "Mild reaction to some triggers", value: 1 },
          { id: "opt3", text: "Moderate reaction to multiple triggers", value: 2 },
          { id: "opt4", text: "Severe reaction to many triggers", value: 3 }
        ]
      },
      {
        id: "exercise_limitation",
        text: "How does breathing affect your ability to exercise?",
        options: [
          { id: "opt1", text: "No limitations", value: 0 },
          { id: "opt2", text: "Slight limitation with intense exercise", value: 1 },
          { id: "opt3", text: "Moderate limitation with normal exercise", value: 2 },
          { id: "opt4", text: "Severe limitation, avoid exercise", value: 3 }
        ]
      },
      {
        id: "rescue_inhaler",
        text: "If you use a rescue inhaler, how often do you need it?",
        options: [
          { id: "opt1", text: "Don't use or never need it", value: 0 },
          { id: "opt2", text: "Less than twice a week", value: 1 },
          { id: "opt3", text: "2-4 times per week", value: 2 },
          { id: "opt4", text: "Daily or multiple times daily", value: 3 }
        ]
      },
      {
        id: "sleep_disruption",
        text: "How often do breathing problems wake you at night?",
        options: [
          { id: "opt1", text: "Never", value: 0 },
          { id: "opt2", text: "Occasionally (once a month)", value: 1 },
          { id: "opt3", text: "Frequently (weekly)", value: 2 },
          { id: "opt4", text: "Almost nightly", value: 3 }
        ]
      }
    ],
    recommendations: {
      low: {
        title: "Low Asthma Risk - Maintain Healthy Lungs",
        advice: "Your respiratory symptoms suggest low asthma risk. Keep your lungs healthy:",
        suggestions: [
          "Continue regular exercise to strengthen lung capacity",
          "Avoid exposure to air pollution and allergens",
          "Don't smoke and avoid secondhand smoke",
          "Practice good respiratory hygiene during illness",
          "Maintain a clean home environment (dust, mold prevention)",
          "Consider annual flu vaccinations",
          "Stay hydrated and maintain good overall health"
        ]
      },
      moderate: {
        title: "Moderate Asthma Risk - Monitor Symptoms",
        advice: "Some respiratory symptoms are present. Consider these preventive measures:",
        suggestions: [
          "Schedule an appointment with your doctor for lung function tests",
          "Keep a symptom diary to identify potential triggers",
          "Learn proper breathing techniques and exercises",
          "Consider allergy testing if triggers are suspected",
          "Have a respiratory action plan discussed with your healthcare provider",
          "Avoid known irritants (strong scents, cleaning chemicals)",
          "Consider seeing a pulmonologist for specialized care"
        ]
      },
      high: {
        title: "High Asthma Risk - Seek Medical Evaluation",
        advice: "Your symptoms strongly suggest possible asthma. Please take immediate action:",
        suggestions: [
          "Schedule an urgent appointment with a pulmonologist",
          "Get comprehensive lung function tests (spirometry, peak flow)",
          "Discuss inhaler medications and asthma action plan",
          "Learn proper inhaler technique and when to use rescue medications",
          "Identify and avoid asthma triggers",
          "Consider allergy testing and immunotherapy if appropriate",
          "Have an emergency action plan for severe asthma attacks"
        ]
      }
    }
  },
  {
    id: "covid-checker",
    title: "COVID-19 Symptom Checker",
    description: "Comprehensive assessment of symptoms that might indicate COVID-19 infection or variants",
    category: "Infectious Disease",
    difficulty: "Easy",
    estimatedTime: "5-7 min",
    icon: "🦠",
    questions: [
      {
        id: "fever",
        text: "Do you have a fever (temperature above 100.4°F/38°C)?",
        options: [
          { id: "opt1", text: "No fever", value: 0 },
          { id: "opt2", text: "Low-grade fever (100.4-101°F)", value: 1 },
          { id: "opt3", text: "Moderate fever (101-103°F)", value: 2 },
          { id: "opt4", text: "High fever (above 103°F)", value: 3 }
        ]
      },
      {
        id: "cough",
        text: "Do you have a persistent dry cough?",
        options: [
          { id: "opt1", text: "No cough", value: 0 },
          { id: "opt2", text: "Mild occasional cough", value: 1 },
          { id: "opt3", text: "Persistent dry cough", value: 2 },
          { id: "opt4", text: "Severe persistent cough", value: 3 }
        ]
      },
      {
        id: "taste_smell",
        text: "Have you lost your sense of taste or smell?",
        options: [
          { id: "opt1", text: "Normal taste and smell", value: 0 },
          { id: "opt2", text: "Slight reduction", value: 1 },
          { id: "opt3", text: "Significant loss", value: 2 },
          { id: "opt4", text: "Complete loss", value: 3 }
        ]
      },
      {
        id: "fatigue",
        text: "Do you have unusual fatigue or exhaustion?",
        options: [
          { id: "opt1", text: "Normal energy", value: 0 },
          { id: "opt2", text: "Mild fatigue", value: 1 },
          { id: "opt3", text: "Moderate fatigue", value: 2 },
          { id: "opt4", text: "Severe exhaustion", value: 3 }
        ]
      },
      {
        id: "breathing",
        text: "Do you have shortness of breath or difficulty breathing?",
        options: [
          { id: "opt1", text: "No breathing issues", value: 0 },
          { id: "opt2", text: "Mild shortness of breath with activity", value: 1 },
          { id: "opt3", text: "Breathing difficulty with normal activity", value: 2 },
          { id: "opt4", text: "Severe breathing problems at rest", value: 3 }
        ]
      },
      {
        id: "sore_throat",
        text: "Do you have a sore throat?",
        options: [
          { id: "opt1", text: "No sore throat", value: 0 },
          { id: "opt2", text: "Mild throat irritation", value: 1 },
          { id: "opt3", text: "Moderate sore throat", value: 2 },
          { id: "opt4", text: "Severe sore throat", value: 3 }
        ]
      },
      {
        id: "body_aches",
        text: "Do you have body aches or muscle pain?",
        options: [
          { id: "opt1", text: "No body aches", value: 0 },
          { id: "opt2", text: "Mild muscle aches", value: 1 },
          { id: "opt3", text: "Moderate body aches", value: 2 },
          { id: "opt4", text: "Severe muscle pain", value: 3 }
        ]
      },
      {
        id: "headache",
        text: "Do you have headaches?",
        options: [
          { id: "opt1", text: "No headaches", value: 0 },
          { id: "opt2", text: "Mild headache", value: 1 },
          { id: "opt3", text: "Moderate headache", value: 2 },
          { id: "opt4", text: "Severe persistent headache", value: 3 }
        ]
      }
    ],
    recommendations: {
      low: {
        title: "Low COVID Risk - Continue Precautions",
        advice: "Your symptoms suggest low COVID-19 risk. Maintain preventive measures:",
        suggestions: [
          "Continue following current health guidelines",
          "Maintain good hand hygiene and mask-wearing in crowded areas",
          "Stay up to date with COVID-19 vaccinations and boosters",
          "Monitor for any new symptoms and test if exposed",
          "Maintain physical distance from sick individuals",
          "Keep immune system strong with good nutrition and sleep",
          "Follow local health department recommendations"
        ]
      },
      moderate: {
        title: "Moderate COVID Risk - Test and Monitor",
        advice: "Some symptoms are present. Take these precautions and get tested:",
        suggestions: [
          "Get a COVID-19 test (rapid antigen or PCR test)",
          "Isolate yourself from others until you know your status",
          "Monitor symptoms closely and track any changes",
          "Stay hydrated and get plenty of rest",
          "Avoid contact with high-risk individuals",
          "Contact your healthcare provider if symptoms worsen",
          "Follow CDC guidelines for isolation if positive"
        ]
      },
      high: {
        title: "High COVID Risk - Seek Medical Care",
        advice: "Your symptoms strongly suggest possible COVID-19. Take immediate action:",
        suggestions: [
          "Get immediate COVID-19 testing and contact your doctor",
          "Isolate immediately and notify close contacts",
          "Monitor oxygen levels if you have a pulse oximeter",
          "Seek emergency care if breathing becomes severely difficult",
          "Consider antiviral treatments if eligible (contact doctor within 5 days)",
          "Stay isolated for recommended period even if symptoms improve",
          "Contact emergency services if you experience severe symptoms"
        ]
      }
    }
  },
  {
    id: "diabetes-checker",
    title: "Diabetes Risk Assessment",
    description: "Comprehensive evaluation of your risk factors for developing diabetes",
    category: "Metabolic Health",
    difficulty: "Easy",
    estimatedTime: "6-8 min",
    icon: "🩺",
    questions: [
      {
        id: "age_weight",
        text: "What is your age and weight status?",
        options: [
          { id: "opt1", text: "Under 40, normal weight", value: 0 },
          { id: "opt2", text: "40-60, slightly overweight", value: 1 },
          { id: "opt3", text: "Over 45, overweight", value: 2 },
          { id: "opt4", text: "Over 45, obese", value: 3 }
        ]
      },
      {
        id: "family_history",
        text: "Do you have family history of diabetes?",
        options: [
          { id: "opt1", text: "No family history", value: 0 },
          { id: "opt2", text: "Distant relatives", value: 1 },
          { id: "opt3", text: "Parents or siblings", value: 2 },
          { id: "opt4", text: "Multiple close relatives", value: 3 }
        ]
      },
      {
        id: "thirst_urination",
        text: "Have you experienced increased thirst and frequent urination?",
        options: [
          { id: "opt1", text: "Never", value: 0 },
          { id: "opt2", text: "Occasionally", value: 1 },
          { id: "opt3", text: "Frequently", value: 2 },
          { id: "opt4", text: "Very frequently", value: 3 }
        ]
      },
      {
        id: "fatigue_hunger",
        text: "Do you experience unusual fatigue or increased hunger?",
        options: [
          { id: "opt1", text: "Normal energy and appetite", value: 0 },
          { id: "opt2", text: "Slightly tired or hungry", value: 1 },
          { id: "opt3", text: "Often tired and hungry", value: 2 },
          { id: "opt4", text: "Constantly exhausted and hungry", value: 3 }
        ]
      },
      {
        id: "vision_healing",
        text: "Have you noticed blurred vision or slow wound healing?",
        options: [
          { id: "opt1", text: "No vision or healing issues", value: 0 },
          { id: "opt2", text: "Occasional blurry vision", value: 1 },
          { id: "opt3", text: "Regular vision problems or slow healing", value: 2 },
          { id: "opt4", text: "Frequent vision issues and very slow healing", value: 3 }
        ]
      },
      {
        id: "blood_pressure",
        text: "What is your blood pressure status?",
        options: [
          { id: "opt1", text: "Normal (less than 120/80)", value: 0 },
          { id: "opt2", text: "Elevated (120-129/less than 80)", value: 1 },
          { id: "opt3", text: "High Stage 1 (130-139/80-89)", value: 2 },
          { id: "opt4", text: "High Stage 2 (140/90 or higher)", value: 3 }
        ]
      },
      {
        id: "exercise_diet",
        text: "How would you describe your lifestyle?",
        options: [
          { id: "opt1", text: "Regular exercise, healthy diet", value: 0 },
          { id: "opt2", text: "Some exercise, mostly healthy eating", value: 1 },
          { id: "opt3", text: "Little exercise, mixed diet", value: 2 },
          { id: "opt4", text: "Sedentary, poor diet", value: 3 }
        ]
      },
      {
        id: "skin_infections",
        text: "Do you have frequent infections or skin problems?",
        options: [
          { id: "opt1", text: "Rarely get sick", value: 0 },
          { id: "opt2", text: "Occasional infections", value: 1 },
          { id: "opt3", text: "Frequent minor infections", value: 2 },
          { id: "opt4", text: "Constant infections or skin issues", value: 3 }
        ]
      }
    ],
    recommendations: {
      low: {
        title: "Low Diabetes Risk - Maintain Healthy Habits",
        advice: "Great job! Your diabetes risk appears low. Keep up these healthy practices:",
        suggestions: [
          "Maintain a balanced diet with whole grains, lean proteins, and vegetables",
          "Stay physically active (150 minutes/week of moderate activity)",
          "Keep a healthy weight (BMI under 25)",
          "Get regular health screenings every 1-2 years",
          "Stay hydrated with water instead of sugary drinks",
          "Get adequate sleep (7-9 hours nightly)",
          "Manage stress through healthy coping strategies"
        ]
      },
      moderate: {
        title: "Moderate Diabetes Risk - Prevention is Key",
        advice: "You may be at increased risk for diabetes. Take these preventive steps:",
        suggestions: [
          "Schedule a diabetes screening test with your doctor (A1C, fasting glucose)",
          "Start a structured weight loss program if overweight",
          "Follow a low-glycemic diet (limit refined sugars and carbs)",
          "Increase physical activity gradually",
          "Monitor family history and discuss with healthcare provider",
          "Consider meeting with a registered dietitian",
          "Get regular check-ups every 6-12 months"
        ]
      },
      high: {
        title: "High Diabetes Risk - Take Immediate Action",
        advice: "Your results suggest high diabetes risk. Please consult a healthcare provider promptly:",
        suggestions: [
          "Schedule an immediate appointment for diabetes testing",
          "Get comprehensive blood work (A1C, fasting glucose, oral glucose tolerance test)",
          "Discuss medication options if diagnosed with pre-diabetes",
          "Start intensive lifestyle modification program",
          "Work with a diabetes educator and nutritionist",
          "Begin blood sugar monitoring if recommended",
          "Join a diabetes prevention program if available"
        ]
      }
    }
  },
  {
    id: "depression-checker",
    title: "Depression Assessment",
    description: "Comprehensive evaluation of depressive symptoms and their impact on daily functioning",
    category: "Mental Health",
    difficulty: "Easy",
    estimatedTime: "7-9 min",
    icon: "😔",
    questions: [
      {
        id: "depressed_mood",
        text: "Over the last 2 weeks, how often have you felt down, depressed, or hopeless?",
        options: [
          { id: "opt1", text: "Not at all", value: 0 },
          { id: "opt2", text: "Several days", value: 1 },
          { id: "opt3", text: "More than half the days", value: 2 },
          { id: "opt4", text: "Nearly every day", value: 3 }
        ]
      },
      {
        id: "loss_interest",
        text: "How often have you had little interest or pleasure in doing things?",
        options: [
          { id: "opt1", text: "Not at all", value: 0 },
          { id: "opt2", text: "Several days", value: 1 },
          { id: "opt3", text: "More than half the days", value: 2 },
          { id: "opt4", text: "Nearly every day", value: 3 }
        ]
      },
      {
        id: "sleep_changes",
        text: "How has your sleep been affected?",
        options: [
          { id: "opt1", text: "Normal sleep patterns", value: 0 },
          { id: "opt2", text: "Slight changes in sleep", value: 1 },
          { id: "opt3", text: "Significant sleep problems", value: 2 },
          { id: "opt4", text: "Severe sleep disturbances", value: 3 }
        ]
      },
      {
        id: "energy_fatigue",
        text: "How often do you feel tired or have little energy?",
        options: [
          { id: "opt1", text: "Not at all", value: 0 },
          { id: "opt2", text: "Several days", value: 1 },
          { id: "opt3", text: "More than half the days", value: 2 },
          { id: "opt4", text: "Nearly every day", value: 3 }
        ]
      },
      {
        id: "appetite_weight",
        text: "Have you experienced changes in appetite or weight?",
        options: [
          { id: "opt1", text: "No changes", value: 0 },
          { id: "opt2", text: "Slight changes in appetite", value: 1 },
          { id: "opt3", text: "Significant appetite/weight changes", value: 2 },
          { id: "opt4", text: "Severe appetite changes affecting health", value: 3 }
        ]
      },
      {
        id: "self_worth",
        text: "How often do you feel bad about yourself or like a failure?",
        options: [
          { id: "opt1", text: "Not at all", value: 0 },
          { id: "opt2", text: "Several days", value: 1 },
          { id: "opt3", text: "More than half the days", value: 2 },
          { id: "opt4", text: "Nearly every day", value: 3 }
        ]
      },
      {
        id: "concentration",
        text: "How often do you have trouble concentrating?",
        options: [
          { id: "opt1", text: "Not at all", value: 0 },
          { id: "opt2", text: "Several days", value: 1 },
          { id: "opt3", text: "More than half the days", value: 2 },
          { id: "opt4", text: "Nearly every day", value: 3 }
        ]
      },
      {
        id: "movement_changes",
        text: "Do you move or speak more slowly, or feel restless?",
        options: [
          { id: "opt1", text: "No changes", value: 0 },
          { id: "opt2", text: "Slight changes others notice", value: 1 },
          { id: "opt3", text: "Noticeable changes in movement/speech", value: 2 },
          { id: "opt4", text: "Significant agitation or slowness", value: 3 }
        ]
      }
    ],
    recommendations: {
      low: {
        title: "Low Depression Risk - Maintain Mental Wellness",
        advice: "Your mental health appears stable. Continue these positive practices:",
        suggestions: [
          "Maintain regular social connections and activities",
          "Keep a consistent sleep schedule and healthy routines",
          "Stay physically active with regular exercise",
          "Practice stress management and mindfulness",
          "Engage in hobbies and activities that bring joy",
          "Maintain a balanced, nutritious diet",
          "Consider regular check-ins with a counselor for wellness"
        ]
      },
      moderate: {
        title: "Moderate Depression Risk - Seek Support",
        advice: "Some concerning symptoms are present. Consider these supportive measures:",
        suggestions: [
          "Schedule an appointment with a mental health counselor",
          "Talk to trusted friends, family, or support groups",
          "Establish daily routines and set small, achievable goals",
          "Increase physical activity and time outdoors",
          "Practice relaxation techniques and mindfulness",
          "Limit alcohol and avoid substance use",
          "Consider therapy options like cognitive behavioral therapy (CBT)"
        ]
      },
      high: {
        title: "High Depression Risk - Get Professional Help",
        advice: "Your symptoms suggest significant depression. Please seek professional help immediately:",
        suggestions: [
          "Schedule an urgent appointment with a mental health professional",
          "Consider therapy and discuss medication options with a psychiatrist",
          "Develop a safety plan and crisis contacts",
          "Build a strong support network and avoid isolation",
          "Contact crisis helplines if you have thoughts of self-harm",
          "Consider intensive outpatient or inpatient treatment if recommended",
          "Follow up regularly with mental health providers"
        ]
      }
    }
  },
  {
    id: "heart-disease-checker",
    title: "Heart Disease Risk Assessment",
    description: "Comprehensive evaluation of your cardiovascular health and risk factors",
    category: "Heart Health",
    difficulty: "Medium",
    estimatedTime: "8-10 min",
    icon: "❤️",
    questions: [
      {
        id: "chest_pain",
        text: "Do you experience chest pain or discomfort?",
        options: [
          { id: "opt1", text: "Never", value: 0 },
          { id: "opt2", text: "Rarely, only during intense exercise", value: 1 },
          { id: "opt3", text: "Sometimes during moderate activity", value: 2 },
          { id: "opt4", text: "Frequently, even at rest", value: 3 }
        ]
      },
      {
        id: "shortness_breath",
        text: "Do you experience shortness of breath?",
        options: [
          { id: "opt1", text: "No breathing problems", value: 0 },
          { id: "opt2", text: "Only during intense exercise", value: 1 },
          { id: "opt3", text: "During normal activities", value: 2 },
          { id: "opt4", text: "At rest or lying down", value: 3 }
        ]
      },
      {
        id: "fatigue_dizziness",
        text: "Do you experience unusual fatigue or dizziness?",
        options: [
          { id: "opt1", text: "Normal energy, no dizziness", value: 0 },
          { id: "opt2", text: "Occasionally tired", value: 1 },
          { id: "opt3", text: "Frequently tired with normal activities", value: 2 },
          { id: "opt4", text: "Extreme fatigue with minimal exertion", value: 3 }
        ]
      },
      {
        id: "swelling",
        text: "Do you have swelling in legs, ankles, or feet?",
        options: [
          { id: "opt1", text: "No swelling", value: 0 },
          { id: "opt2", text: "Occasional mild swelling", value: 1 },
          { id: "opt3", text: "Regular swelling, especially evenings", value: 2 },
          { id: "opt4", text: "Constant swelling", value: 3 }
        ]
      },
      {
        id: "blood_pressure",
        text: "What is your typical blood pressure?",
        options: [
          { id: "opt1", text: "Normal (less than 120/80)", value: 0 },
          { id: "opt2", text: "Elevated (120-129/less than 80)", value: 1 },
          { id: "opt3", text: "Stage 1 High (130-139/80-89)", value: 2 },
          { id: "opt4", text: "Stage 2 High (140/90 or higher)", value: 3 }
        ]
      },
      {
        id: "cholesterol",
        text: "What are your cholesterol levels?",
        options: [
          { id: "opt1", text: "Normal (Total <200, LDL <100)", value: 0 },
          { id: "opt2", text: "Borderline high (Total 200-239)", value: 1 },
          { id: "opt3", text: "High (Total 240+, LDL 130-159)", value: 2 },
          { id: "opt4", text: "Very high (LDL 160+) or unknown", value: 3 }
        ]
      },
      {
        id: "family_history",
        text: "Do you have family history of heart disease?",
        options: [
          { id: "opt1", text: "No family history", value: 0 },
          { id: "opt2", text: "Heart disease in relatives over 65", value: 1 },
          { id: "opt3", text: "Heart disease in close relatives under 65", value: 2 },
          { id: "opt4", text: "Multiple family members with early heart disease", value: 3 }
        ]
      },
      {
        id: "lifestyle_factors",
        text: "Do you smoke or have diabetes?",
        options: [
          { id: "opt1", text: "Never smoked, no diabetes", value: 0 },
          { id: "opt2", text: "Former smoker or pre-diabetes", value: 1 },
          { id: "opt3", text: "Current light smoker or well-controlled diabetes", value: 2 },
          { id: "opt4", text: "Heavy smoker or poorly controlled diabetes", value: 3 }
        ]
      }
    ],
    recommendations: {
      low: {
        title: "Low Heart Disease Risk - Keep Up the Good Work!",
        advice: "Your heart health appears to be in good shape. Continue with these heart-healthy practices:",
        suggestions: [
          "Maintain regular physical activity (150 minutes/week of moderate exercise)",
          "Follow a heart-healthy diet rich in fruits, vegetables, and whole grains",
          "Keep blood pressure and cholesterol levels in check",
          "Don't smoke and limit alcohol consumption",
          "Manage stress through relaxation techniques",
          "Get regular check-ups with your healthcare provider",
          "Maintain a healthy weight and BMI"
        ]
      },
      moderate: {
        title: "Moderate Heart Disease Risk - Time to Take Action",
        advice: "Some risk factors are present. Consider these heart-healthy changes:",
        suggestions: [
          "Schedule an appointment with your doctor for a comprehensive heart evaluation",
          "Start a structured exercise program (consult your doctor first)",
          "Adopt the DASH diet or Mediterranean diet",
          "Monitor blood pressure regularly and consider medication if needed",
          "Get cholesterol levels checked and managed",
          "Consider stress management programs or counseling",
          "Quit smoking if you smoke, limit alcohol consumption"
        ]
      },
      high: {
        title: "High Heart Disease Risk - Seek Medical Attention",
        advice: "Your results suggest significant heart disease risk. Please take immediate action:",
        suggestions: [
          "Schedule an urgent appointment with a cardiologist",
          "Get comprehensive cardiac testing (ECG, stress test, echocardiogram, blood work)",
          "Discuss medication options with your doctor (statins, blood pressure medications)",
          "Start cardiac rehabilitation if recommended",
          "Make immediate lifestyle changes (diet, exercise, smoking cessation)",
          "Monitor symptoms closely and seek emergency care if chest pain occurs",
          "Consider joining a heart disease support group"
        ]
      }
    }
  },
  {
    id: "lifestyle-assessment",
    title: "Lifestyle & Life Expectancy Assessment",
    description: "Comprehensive lifestyle evaluation to predict your life expectancy",
    category: "General Health",
    difficulty: "Easy",
    estimatedTime: "8-10 min",
    icon: "🔮",
    questions: [
      {
        id: "smoking_habits",
        text: "Do you smoke or use tobacco products?",
        options: [
          { id: "never", text: "Never smoked", value: 0 },
          { id: "former", text: "Former smoker (quit >2 years ago)", value: 1 },
          { id: "light", text: "Light smoker (1-5 cigarettes/day)", value: 3 },
          { id: "heavy", text: "Heavy smoker (10+ cigarettes/day)", value: 5 }
        ]
      },
      {
        id: "exercise_frequency",
        text: "How often do you exercise or do physical activity?",
        options: [
          { id: "daily", text: "Daily (30+ minutes)", value: 0 },
          { id: "regular", text: "3-4 times per week", value: 1 },
          { id: "occasional", text: "1-2 times per week", value: 2 },
          { id: "rarely", text: "Rarely or never", value: 4 }
        ]
      },
      {
        id: "sleep_hours",
        text: "How many hours do you typically sleep per night?",
        options: [
          { id: "optimal", text: "7-9 hours", value: 0 },
          { id: "less", text: "5-6 hours", value: 2 },
          { id: "very_less", text: "Less than 5 hours", value: 4 },
          { id: "too_much", text: "More than 10 hours", value: 1 }
        ]
      },
      {
        id: "alcohol_consumption",
        text: "How often do you consume alcohol?",
        options: [
          { id: "never", text: "Never or rarely", value: 0 },
          { id: "moderate", text: "1-2 drinks per week", value: 1 },
          { id: "regular", text: "3-7 drinks per week", value: 2 },
          { id: "heavy", text: "More than 8 drinks per week", value: 4 }
        ]
      },
      {
        id: "diet_quality",
        text: "How would you describe your diet?",
        options: [
          { id: "excellent", text: "Mostly healthy foods, lots of fruits/vegetables", value: 0 },
          { id: "good", text: "Balanced diet with occasional junk food", value: 1 },
          { id: "poor", text: "Frequent junk food, few fruits/vegetables", value: 3 },
          { id: "very_poor", text: "Mostly processed/fast food", value: 5 }
        ]
      },
      {
        id: "stress_levels",
        text: "How would you rate your daily stress levels?",
        options: [
          { id: "low", text: "Low - I feel calm most of the time", value: 0 },
          { id: "moderate", text: "Moderate - Some stress but manageable", value: 1 },
          { id: "high", text: "High - Frequently stressed or overwhelmed", value: 3 },
          { id: "very_high", text: "Very high - Constantly stressed", value: 4 }
        ]
      },
      {
        id: "water_intake",
        text: "How much water do you drink daily?",
        options: [
          { id: "adequate", text: "8+ glasses (2+ liters)", value: 0 },
          { id: "moderate", text: "4-7 glasses", value: 1 },
          { id: "low", text: "2-3 glasses", value: 2 },
          { id: "very_low", text: "Less than 2 glasses", value: 3 }
        ]
      },
      {
        id: "screen_time",
        text: "How many hours do you spend on screens daily (phone/computer/TV)?",
        options: [
          { id: "minimal", text: "Less than 4 hours", value: 0 },
          { id: "moderate", text: "4-6 hours", value: 1 },
          { id: "high", text: "7-10 hours", value: 2 },
          { id: "excessive", text: "More than 10 hours", value: 3 }
        ]
      }
    ],
    recommendations: {
      low: {
        title: "Excellent Lifestyle - Keep It Up!",
        advice: "Your lifestyle habits are excellent for longevity. Maintain these healthy practices:",
        suggestions: [
          "Continue your balanced diet with plenty of fruits and vegetables",
          "Maintain your regular exercise routine",
          "Keep your stress management techniques effective",
          "Stay hydrated with adequate water intake",
          "Maintain your healthy sleep patterns",
          "Continue to avoid smoking and limit alcohol",
          "Keep up with regular health check-ups"
        ]
      },
      moderate: {
        title: "Moderate Lifestyle - Room for Improvement",
        advice: "Your lifestyle has some areas that could be improved for better longevity:",
        suggestions: [
          "Increase your physical activity to at least 30 minutes daily",
          "Improve your diet by adding more fruits and vegetables",
          "Develop better stress management techniques",
          "Work on improving your sleep quality and duration",
          "Reduce screen time and take regular breaks",
          "Limit alcohol consumption and avoid smoking",
          "Consider a wellness check with your healthcare provider"
        ]
      },
      high: {
        title: "High-Risk Lifestyle - Immediate Changes Needed",
        advice: "Your lifestyle habits put you at risk for reduced life expectancy. Make these changes immediately:",
        suggestions: [
          "Quit smoking and avoid secondhand smoke completely",
          "Start a structured exercise program with professional guidance",
          "Adopt a healthy diet with plenty of whole foods and vegetables",
          "Develop a comprehensive stress management plan",
          "Establish healthy sleep habits with consistent bedtime routines",
          "Significantly reduce alcohol consumption",
          "Schedule an appointment with your doctor for a complete health evaluation",
          "Consider working with a health coach or lifestyle counselor"
        ]
      }
    }
  }
];

export const getToolById = (id: string): HealthTool | undefined => {
  return healthTools.find(tool => tool.id === id);
};

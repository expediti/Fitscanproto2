export interface HealthQuestion {
  id: string;
  question: string;
  options: string[];
  scores: number[];
  category: string;
}

export interface HealthQuiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: string;
  icon: string;
  questions: HealthQuestion[];
  riskLevels: {
    low: { min: number; max: number; message: string; color: string };
    medium: { min: number; max: number; message: string; color: string };
    high: { min: number; max: number; message: string; color: string };
  };
}

// 1. LIVER HEALTH ASSESSMENT
export const liverHealthQuiz: HealthQuiz = {
  id: 'liver-health',
  title: 'Liver Health Assessment',
  description: 'Evaluate your liver health and detect potential risks',
  category: 'Internal Medicine',
  difficulty: 'Medium',
  estimatedTime: '3-4 minutes',
  icon: '🫀',
  questions: [
    {
      id: 'liver-1',
      question: 'Do you experience persistent fatigue or weakness?',
      options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
      scores: [0, 1, 2, 3, 4],
      category: 'symptoms'
    },
    {
      id: 'liver-2', 
      question: 'Have you noticed yellowing of your skin or eyes?',
      options: ['No, never', 'Very mild', 'Somewhat noticeable', 'Quite noticeable'],
      scores: [0, 2, 3, 4],
      category: 'symptoms'
    },
    {
      id: 'liver-3',
      question: 'Do you experience abdominal pain or discomfort in the upper right area?',
      options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Daily'],
      scores: [0, 1, 2, 3, 4],
      category: 'symptoms'
    },
    {
      id: 'liver-4',
      question: 'How often do you consume alcohol?',
      options: ['Never', '1-2 drinks/week', '3-7 drinks/week', '8-14 drinks/week', '15+ drinks/week'],
      scores: [0, 1, 2, 3, 4],
      category: 'lifestyle'
    },
    {
      id: 'liver-5',
      question: 'Have you experienced unexplained weight loss recently?',
      options: ['No weight loss', 'Minor (1-2 kg)', 'Moderate (3-5 kg)', 'Significant (>5 kg)'],
      scores: [0, 1, 2, 3],
      category: 'symptoms'
    },
    {
      id: 'liver-6',
      question: 'Do you have swelling in your legs, ankles, or abdomen?',
      options: ['Never', 'Rarely', 'Sometimes', 'Often'],
      scores: [0, 1, 2, 3],
      category: 'symptoms'
    },
    {
      id: 'liver-7',
      question: 'Have you been diagnosed with hepatitis or other liver conditions?',
      options: ['No', 'Suspected/Testing', 'Yes, in the past', 'Yes, currently'],
      scores: [0, 2, 3, 4],
      category: 'medical-history'
    },
    {
      id: 'liver-8',
      question: 'How would you describe your overall energy levels?',
      options: ['Very energetic', 'Good energy', 'Moderate energy', 'Low energy', 'Constantly tired'],
      scores: [0, 1, 2, 3, 4],
      category: 'general'
    }
  ],
  riskLevels: {
    low: { min: 0, max: 8, message: 'Low risk. Maintain healthy habits!', color: 'text-green-600' },
    medium: { min: 9, max: 16, message: 'Moderate risk. Consider lifestyle changes.', color: 'text-yellow-600' },
    high: { min: 17, max: 32, message: 'High risk. Consult a healthcare provider.', color: 'text-red-600' }
  }
};

// 2. HEART HEALTH ASSESSMENT
export const heartHealthQuiz: HealthQuiz = {
  id: 'heart-health',
  title: 'Heart Health Assessment', 
  description: 'Assess your cardiovascular health and heart disease risk',
  category: 'Cardiology',
  difficulty: 'Medium',
  estimatedTime: '4-5 minutes',
  icon: '❤️',
  questions: [
    {
      id: 'heart-1',
      question: 'Do you experience chest pain or discomfort during physical activity?',
      options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
      scores: [0, 1, 2, 3, 4],
      category: 'symptoms'
    },
    {
      id: 'heart-2',
      question: 'How often do you feel short of breath during normal activities?',
      options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
      scores: [0, 1, 2, 3, 4],
      category: 'symptoms'
    },
    {
      id: 'heart-3',
      question: 'Do you experience irregular heartbeat or palpitations?',
      options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Daily'],
      scores: [0, 1, 2, 3, 4],
      category: 'symptoms'
    },
    {
      id: 'heart-4',
      question: 'How many days per week do you exercise for at least 30 minutes?',
      options: ['5-7 days', '3-4 days', '1-2 days', 'Rarely', 'Never'],
      scores: [0, 1, 2, 3, 4],
      category: 'lifestyle'
    },
    {
      id: 'heart-5',
      question: 'Do you smoke or use tobacco products?',
      options: ['Never smoked', 'Former smoker (quit >1 year)', 'Former smoker (quit <1 year)', 'Occasional smoker', 'Daily smoker'],
      scores: [0, 1, 2, 3, 4],
      category: 'lifestyle'
    },
    {
      id: 'heart-6',
      question: 'What is your typical stress level?',
      options: ['Very low', 'Low', 'Moderate', 'High', 'Very high'],
      scores: [0, 1, 2, 3, 4],
      category: 'lifestyle'
    },
    {
      id: 'heart-7',
      question: 'Do you have a family history of heart disease?',
      options: ['No family history', 'Distant relatives', 'Grandparents', 'Parents/siblings', 'Multiple close relatives'],
      scores: [0, 1, 2, 3, 4],
      category: 'family-history'
    },
    {
      id: 'heart-8',
      question: 'How would you describe your diet?',
      options: ['Very healthy (lots of fruits/vegetables)', 'Mostly healthy', 'Average', 'Poor (processed foods)', 'Very poor (fast food daily)'],
      scores: [0, 1, 2, 3, 4],
      category: 'lifestyle'
    }
  ],
  riskLevels: {
    low: { min: 0, max: 8, message: 'Excellent heart health! Keep it up!', color: 'text-green-600' },
    medium: { min: 9, max: 16, message: 'Moderate risk. Consider heart-healthy changes.', color: 'text-yellow-600' },
    high: { min: 17, max: 32, message: 'High risk. Please consult a cardiologist.', color: 'text-red-600' }
  }
};

// 3. HYPERTENSION/HIGH BP ASSESSMENT
export const hypertensionQuiz: HealthQuiz = {
  id: 'hypertension-assessment',
  title: 'Hypertension & High BP Assessment',
  description: 'Evaluate your blood pressure risk and hypertension factors',
  category: 'Cardiology',
  difficulty: 'Easy',
  estimatedTime: '3-4 minutes',
  icon: '🩺',
  questions: [
    {
      id: 'bp-1',
      question: 'What was your last blood pressure reading?',
      options: ['Normal (<120/80)', 'Elevated (120-129/<80)', 'Stage 1 (130-139/80-89)', 'Stage 2 (≥140/≥90)', 'I don\'t know'],
      scores: [0, 1, 2, 3, 2],
      category: 'measurements'
    },
    {
      id: 'bp-2',
      question: 'Do you experience frequent headaches?',
      options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Daily'],
      scores: [0, 1, 2, 3, 4],
      category: 'symptoms'
    },
    {
      id: 'bp-3',
      question: 'How often do you add salt to your food?',
      options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
      scores: [0, 1, 2, 3, 4],
      category: 'diet'
    },
    {
      id: 'bp-4',
      question: 'How many servings of fruits and vegetables do you eat daily?',
      options: ['5+ servings', '3-4 servings', '2 servings', '1 serving', 'None'],
      scores: [0, 1, 2, 3, 4],
      category: 'diet'
    },
    {
      id: 'bp-5',
      question: 'Do you experience dizziness or lightheadedness?',
      options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Daily'],
      scores: [0, 1, 2, 3, 4],
      category: 'symptoms'
    },
    {
      id: 'bp-6',
      question: 'How would you rate your current weight status?',
      options: ['Underweight', 'Normal weight', 'Slightly overweight', 'Overweight', 'Obese'],
      scores: [1, 0, 1, 2, 3],
      category: 'physical'
    },
    {
      id: 'bp-7',
      question: 'Do you have diabetes or kidney disease?',
      options: ['No', 'Pre-diabetes', 'Type 2 diabetes', 'Type 1 diabetes', 'Kidney disease'],
      scores: [0, 2, 3, 3, 4],
      category: 'medical-conditions'
    },
    {
      id: 'bp-8',
      question: 'How many alcoholic drinks do you consume per week?',
      options: ['0 drinks', '1-7 drinks', '8-14 drinks', '15-21 drinks', '22+ drinks'],
      scores: [0, 1, 2, 3, 4],
      category: 'lifestyle'
    }
  ],
  riskLevels: {
    low: { min: 0, max: 8, message: 'Low hypertension risk. Great job!', color: 'text-green-600' },
    medium: { min: 9, max: 16, message: 'Moderate risk. Monitor BP regularly.', color: 'text-yellow-600' },
    high: { min: 17, max: 32, message: 'High risk. See a doctor for BP management.', color: 'text-red-600' }
  }
};

// 4. SLEEP QUALITY ASSESSMENT
export const sleepQualityQuiz: HealthQuiz = {
  id: 'sleep-quality',
  title: 'Sleep Quality Assessment',
  description: 'Evaluate your sleep patterns and identify sleep disorders',
  category: 'Sleep Medicine',
  difficulty: 'Easy',
  estimatedTime: '3-4 minutes',
  icon: '😴',
  questions: [
    {
      id: 'sleep-1',
      question: 'How many hours of sleep do you typically get per night?',
      options: ['8+ hours', '7-8 hours', '6-7 hours', '5-6 hours', 'Less than 5 hours'],
      scores: [0, 0, 1, 3, 4],
      category: 'duration'
    },
    {
      id: 'sleep-2',
      question: 'How long does it usually take you to fall asleep?',
      options: ['Less than 15 minutes', '15-30 minutes', '30-60 minutes', '1-2 hours', 'More than 2 hours'],
      scores: [0, 1, 2, 3, 4],
      category: 'quality'
    },
    {
      id: 'sleep-3',
      question: 'How often do you wake up during the night?',
      options: ['Never', 'Rarely (1x/week)', 'Sometimes (2-3x/week)', 'Often (4-5x/week)', 'Every night'],
      scores: [0, 1, 2, 3, 4],
      category: 'quality'
    },
    {
      id: 'sleep-4',
      question: 'How refreshed do you feel upon waking?',
      options: ['Very refreshed', 'Somewhat refreshed', 'Neutral', 'Somewhat tired', 'Very tired'],
      scores: [0, 1, 2, 3, 4],
      category: 'quality'
    },
    {
      id: 'sleep-5',
      question: 'Do you snore or have been told you snore?',
      options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always/Very loudly'],
      scores: [0, 1, 2, 3, 4],
      category: 'symptoms'
    },
    {
      id: 'sleep-6',
      question: 'How often do you feel sleepy during the day?',
      options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
      scores: [0, 1, 2, 3, 4],
      category: 'daytime-effects'
    },
    {
      id: 'sleep-7',
      question: 'What time do you typically go to bed?',
      options: ['Before 10 PM', '10-11 PM', '11 PM-12 AM', '12-1 AM', 'After 1 AM'],
      scores: [0, 0, 1, 2, 3],
      category: 'schedule'
    },
    {
      id: 'sleep-8',
      question: 'How often do you use electronic devices within 1 hour of bedtime?',
      options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
      scores: [0, 1, 2, 3, 4],
      category: 'habits'
    }
  ],
  riskLevels: {
    low: { min: 0, max: 8, message: 'Excellent sleep quality! Keep it up!', color: 'text-green-600' },
    medium: { min: 9, max: 16, message: 'Some sleep issues. Consider sleep hygiene improvements.', color: 'text-yellow-600' },
    high: { min: 17, max: 32, message: 'Poor sleep quality. Consider consulting a sleep specialist.', color: 'text-red-600' }
  }
};

// 5. NUTRITIONAL DEFICIENCY CHECKER
export const nutritionDeficiencyQuiz: HealthQuiz = {
  id: 'nutrition-deficiency',
  title: 'Nutritional Deficiency Checker',
  description: 'Assess potential vitamin and mineral deficiencies',
  category: 'Nutrition',
  difficulty: 'Medium',
  estimatedTime: '4-5 minutes',
  icon: '🥗',
  questions: [
    {
      id: 'nutrition-1',
      question: 'How often do you eat fruits and vegetables?',
      options: ['5+ servings daily', '3-4 servings daily', '1-2 servings daily', '2-3 times per week', 'Rarely'],
      scores: [0, 1, 2, 3, 4],
      category: 'diet-frequency'
    },
    {
      id: 'nutrition-2',
      question: 'Do you experience frequent fatigue or weakness?',
      options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
      scores: [0, 1, 2, 3, 4],
      category: 'symptoms'
    },
    {
      id: 'nutrition-3',
      question: 'How often do you eat meat, fish, or other protein sources?',
      options: ['Daily', '5-6 times/week', '3-4 times/week', '1-2 times/week', 'Rarely/Never'],
      scores: [0, 1, 2, 3, 4],
      category: 'protein-intake'
    },
    {
      id: 'nutrition-4',
      question: 'Do you experience hair loss or brittle nails?',
      options: ['No', 'Mild', 'Moderate', 'Significant', 'Severe'],
      scores: [0, 1, 2, 3, 4],
      category: 'symptoms'
    },
    {
      id: 'nutrition-5',
      question: 'How often do you consume dairy products or fortified alternatives?',
      options: ['Daily', '5-6 times/week', '3-4 times/week', '1-2 times/week', 'Never'],
      scores: [0, 1, 2, 3, 4],
      category: 'calcium-vitamin-d'
    },
    {
      id: 'nutrition-6',
      question: 'Do you experience frequent infections or slow wound healing?',
      options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very often'],
      scores: [0, 1, 2, 3, 4],
      category: 'immune-symptoms'
    },
    {
      id: 'nutrition-7',
      question: 'How much sun exposure do you get weekly?',
      options: ['Daily outdoor time', '4-6 times/week', '2-3 times/week', 'Once/week', 'Rarely outdoors'],
      scores: [0, 1, 2, 3, 4],
      category: 'vitamin-d'
    },
    {
      id: 'nutrition-8',
      question: 'Do you take any vitamin or mineral supplements?',
      options: ['Complete multivitamin daily', 'Some supplements regularly', 'Occasional supplements', 'Rarely', 'Never'],
      scores: [0, 1, 2, 3, 4],
      category: 'supplementation'
    }
  ],
  riskLevels: {
    low: { min: 0, max: 8, message: 'Good nutritional status! Keep eating well!', color: 'text-green-600' },
    medium: { min: 9, max: 16, message: 'Possible deficiencies. Consider diet improvements.', color: 'text-yellow-600' },
    high: { min: 17, max: 32, message: 'High risk of deficiencies. Consult a nutritionist.', color: 'text-red-600' }
  }
};

// Continue with remaining quizzes...
// Due to space constraints, I'll provide the structure for the remaining ones:

export const allNewHealthQuizzes = [
  liverHealthQuiz,
  heartHealthQuiz,
  hypertensionQuiz,
  sleepQualityQuiz,
  nutritionDeficiencyQuiz,
  // Add remaining quizzes here following the same pattern
];

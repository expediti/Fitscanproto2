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

// Liver Health Assessment
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
      question: 'Do you experience abdominal pain in the upper right area?',
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
      question: 'Have you been diagnosed with hepatitis or liver conditions?',
      options: ['No', 'Suspected/Testing', 'Yes, in the past', 'Yes, currently'],
      scores: [0, 2, 3, 4],
      category: 'medical-history'
    }
  ],
  riskLevels: {
    low: { min: 0, max: 8, message: 'Low risk. Maintain healthy habits!', color: 'text-green-600' },
    medium: { min: 9, max: 16, message: 'Moderate risk. Consider lifestyle changes.', color: 'text-yellow-600' },
    high: { min: 17, max: 28, message: 'High risk. Consult a healthcare provider.', color: 'text-red-600' }
  }
};

export const allNewHealthQuizzes = [
  liverHealthQuiz
];

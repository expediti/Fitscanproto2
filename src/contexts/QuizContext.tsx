import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
} from 'react';

// Define the shape of the quiz state
interface QuizState {
  toolId: string | null;
  answers: Record<string, string>;
  score: number;
  totalQuestions: number;
  currentQuestion: number;
}

// Define the context type
interface QuizContextType {
  quizState: QuizState;
  setToolId: (toolId: string) => void;
  setAnswer: (questionId: string, answerId: string) => void;
  setScore: (score: number) => void;
  setTotalQuestions: (total: number) => void;
  setCurrentQuestion: (current: number) => void;
  resetQuiz: () => void;
}

// Create the context with a default value of `undefined`
const QuizContext = createContext<QuizContextType | undefined>(undefined);

// Define the provider component
export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize the quiz state
  const [quizState, setQuizState] = useState<QuizState>({
    toolId: null,
    answers: {},
    score: 0,
    totalQuestions: 0,
    currentQuestion: 0,
  });

  // Update the tool ID
  const setToolId = (toolId: string) => {
    setQuizState((prev) => ({ ...prev, toolId }));
  };

  // Update an answer for a specific question
  const setAnswer = (questionId: string, answerId: string) => {
    setQuizState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answerId },
    }));
  };

  // Update the score
  const setScore = (score: number) => {
    setQuizState((prev) => ({ ...prev, score }));
  };

  // Update the total number of questions
  const setTotalQuestions = (total: number) => {
    setQuizState((prev) => ({ ...prev, totalQuestions: total }));
  };

  // Update the current question index
  const setCurrentQuestion = (current: number) => {
    setQuizState((prev) => ({ ...prev, currentQuestion: current }));
  };

  // Reset the quiz state
  const resetQuiz = () => {
    setQuizState({
      toolId: null,
      answers: {},
      score: 0,
      totalQuestions: 0,
      currentQuestion: 0,
    });
  };

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      quizState,
      setToolId,
      setAnswer,
      setScore,
      setTotalQuestions,
      setCurrentQuestion,
      resetQuiz,
    }),
    [quizState]
  );

  return (
    <QuizContext.Provider value={contextValue}>
      {children}
    </QuizContext.Provider>
  );
};

// Custom hook to use the quiz context
export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

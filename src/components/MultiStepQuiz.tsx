import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { HealthQuiz } from '@/data/newHealthQuizzes';

interface MultiStepQuizProps {
  quiz: HealthQuiz;
  onComplete: (score: number, answers: Record<string, number>) => void;
}

const MultiStepQuiz: React.FC<MultiStepQuizProps> = ({ quiz, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const currentQuestion = quiz.questions[currentStep];
  const progress = ((currentStep + 1) / quiz.questions.length) * 100;

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption === null) {
      alert('Please select an answer before proceeding.');
      return;
    }

    const newAnswers = {
      ...answers,
      [currentQuestion.id]: currentQuestion.scores[selectedOption]
    };
    setAnswers(newAnswers);

    if (currentStep < quiz.questions.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
    } else {
      // Quiz completed
      const totalScore = Object.values(newAnswers).reduce((sum, score) => sum + score, 0);
      onComplete(totalScore, newAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // Restore previous answer
      const prevQuestion = quiz.questions[currentStep - 1];
      const prevAnswer = answers[prevQuestion.id];
      if (prevAnswer !== undefined) {
        const prevOptionIndex = prevQuestion.scores.indexOf(prevAnswer);
        setSelectedOption(prevOptionIndex);
      } else {
        setSelectedOption(null);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Progress Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">{quiz.title}</h1>
          <Badge variant="outline">
            Question {currentStep + 1} of {quiz.questions.length}
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-muted-foreground mt-2">
          {Math.round(progress)}% Complete
        </p>
      </div>

      {/* Question Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg leading-relaxed">
            {currentQuestion.question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedOption === index
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => handleAnswerSelect(index)}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedOption === index
                        ? 'border-primary bg-primary'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedOption === index && (
                      <CheckCircle className="w-3 h-3 text-primary-foreground" />
                    )}
                  </div>
                  <span className="text-sm font-medium">{option}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="flex items-center space-x-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </Button>

        <Button
          onClick={handleNext}
          disabled={selectedOption === null}
          className="flex items-center space-x-2"
        >
          <span>{currentStep === quiz.questions.length - 1 ? 'Complete Assessment' : 'Next'}</span>
          {currentStep < quiz.questions.length - 1 && <ChevronRight className="w-4 h-4" />}
        </Button>
      </div>

      {/* Question Categories */}
      <div className="mt-6 flex flex-wrap gap-2">
        <Badge variant="secondary" className="text-xs">
          Category: {currentQuestion.category}
        </Badge>
        <Badge variant="outline" className="text-xs">
          {quiz.category}
        </Badge>
      </div>
    </div>
  );
};

export default MultiStepQuiz;

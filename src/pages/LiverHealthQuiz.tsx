import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import MultiStepQuiz from '@/components/MultiStepQuiz';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { liverHealthQuiz } from '@/data/newHealthQuizzes';
import { ArrowLeft, RotateCcw } from 'lucide-react';

const LiverHealthQuiz = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [riskLevel, setRiskLevel] = useState('');
  const navigate = useNavigate();

  const handleQuizComplete = (finalScore: number, answers: Record<string, number>) => {
    setScore(finalScore);
    
    // Determine risk level
    const { riskLevels } = liverHealthQuiz;
    if (finalScore >= riskLevels.low.min && finalScore <= riskLevels.low.max) {
      setRiskLevel('low');
    } else if (finalScore >= riskLevels.medium.min && finalScore <= riskLevels.medium.max) {
      setRiskLevel('medium');
    } else {
      setRiskLevel('high');
    }
    
    setIsCompleted(true);
  };

  const handleRestart = () => {
    setIsCompleted(false);
    setScore(0);
    setRiskLevel('');
  };

  const getRiskLevelData = () => {
    return liverHealthQuiz.riskLevels[riskLevel as keyof typeof liverHealthQuiz.riskLevels];
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 px-4 py-6">
        {!isCompleted ? (
          <div>
            {/* Header */}
            <div className="max-w-2xl mx-auto mb-6">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="mb-4 flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Health Tools</span>
              </Button>
              
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="text-2xl">{liverHealthQuiz.icon}</div>
                    <div>
                      <CardTitle>{liverHealthQuiz.title}</CardTitle>
                      <p className="text-muted-foreground">{liverHealthQuiz.description}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Badge>{liverHealthQuiz.category}</Badge>
                    <Badge variant="outline">{liverHealthQuiz.difficulty}</Badge>
                    <Badge variant="secondary">{liverHealthQuiz.estimatedTime}</Badge>
                  </div>
                </CardHeader>
              </Card>
            </div>

            {/* Quiz Component */}
            <MultiStepQuiz quiz={liverHealthQuiz} onComplete={handleQuizComplete} />
          </div>
        ) : (
          /* Results Page */
          <div className="max-w-2xl mx-auto">
            <Card className="mb-6">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl mb-2">
                  {liverHealthQuiz.title} Results
                </CardTitle>
                <div className="text-4xl mb-4">{liverHealthQuiz.icon}</div>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-6">
                  <div className="text-3xl font-bold mb-2">Score: {score}/{liverHealthQuiz.questions.length * 4}</div>
                  <div className={`text-lg font-semibold ${getRiskLevelData().color}`}>
                    Risk Level: {riskLevel.toUpperCase()}
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${
                  riskLevel === 'low' ? 'bg-green-50 border-green-200' :
                  riskLevel === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-red-50 border-red-200'
                } border`}>
                  <p className="text-lg font-medium mb-2">Assessment Result</p>
                  <p className={getRiskLevelData().color}>{getRiskLevelData().message}</p>
                </div>

                <div className="mt-6 space-y-4">
                  {riskLevel === 'high' && (
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <p className="font-semibold text-red-800 mb-2">Recommended Actions:</p>
                      <ul className="text-sm text-red-700 space-y-1 text-left">
                        <li>• Schedule an appointment with a healthcare provider</li>
                        <li>• Consider liver function tests</li>
                        <li>• Reduce alcohol consumption</li>
                        <li>• Maintain a healthy diet and exercise routine</li>
                      </ul>
                    </div>
                  )}

                  <div className="flex space-x-4 justify-center">
                    <Button onClick={handleRestart} variant="outline" className="flex items-center space-x-2">
                      <RotateCcw className="w-4 h-4" />
                      <span>Retake Assessment</span>
                    </Button>
                    <Button onClick={() => navigate('/')}>
                      Back to Health Tools
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiverHealthQuiz;

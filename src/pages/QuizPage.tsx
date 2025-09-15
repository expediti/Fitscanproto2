import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, X, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { getToolById, HealthTool, Option } from "@/data/tools";

export default function QuizPage() {
  const { toolId } = useParams<{ toolId: string }>();
  const navigate = useNavigate();
  
  const [tool, setTool] = useState<HealthTool | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    if (toolId) {
      const foundTool = getToolById(toolId);
      if (foundTool) {
        setTool(foundTool);
      } else {
        navigate("/");
      }
    }
  }, [toolId, navigate]);

  useEffect(() => {
    // Load previous answer when question changes
    if (tool && tool.questions[currentQuestionIndex]) {
      const questionId = tool.questions[currentQuestionIndex].id;
      const previousAnswer = answers[questionId] || "";
      setSelectedOption(previousAnswer);
    }
  }, [currentQuestionIndex, tool, answers]);

  if (!tool) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <Navigation />
        <div className="text-center mt-20">
          <div className="animate-spin h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading assessment...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = tool.questions[currentQuestionIndex];
  const isFirst = currentQuestionIndex === 0;
  const isLast = currentQuestionIndex === tool.questions.length - 1;
  const canNext = selectedOption !== "";
  const progress = ((currentQuestionIndex + 1) / tool.questions.length) * 100;

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleNext = () => {
    if (!canNext) return;

    // Save current answer
    const newAnswers = { ...answers, [currentQuestion.id]: selectedOption };
    setAnswers(newAnswers);

    if (isLast) {
      // Calculate final score and navigate to results
      const totalScore = tool.questions.reduce((score, q) => {
        const answerId = newAnswers[q.id];
        const option = q.options.find(opt => opt.id === answerId);
        return score + (option?.value || 0);
      }, 0);

      // Navigate to results page with state
      navigate(`/results/${toolId}`, { 
        state: { 
          answers: newAnswers, 
          score: totalScore,
          tool: tool 
        } 
      });
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirst) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <div className="pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={handleHome}>
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
              <div>
                <Badge variant="secondary" className="text-xs">{tool.category}</Badge>
                <h1 className="text-2xl font-bold mt-2">{tool.title}</h1>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {tool.questions.length}
            </div>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} />
          </div>

          {/* Question Card */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold mb-6 text-foreground">
                {currentQuestion.text}
              </h2>

              <div className="space-y-3">
                {currentQuestion.options.map((option: Option, idx: number) => {
                  const isSelected = selectedOption === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleOptionSelect(option.id)}
                      className={`w-full text-left p-4 rounded-lg border transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                          : "border-border hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                            isSelected ? "border-primary" : "border-muted-foreground/30"
                          }`}
                        >
                          {isSelected && <div className="h-2 w-2 rounded-full bg-primary" />}
                        </div>
                        <div className="flex-1">
                          <span className="mr-2 text-xs text-muted-foreground">[{idx + 1}]</span>
                          <span className="font-medium">{option.text}</span>
                        </div>
                      </div>
                      {option.description && (
                        <p className="mt-2 text-sm text-muted-foreground ml-7">
                          {option.description}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between pb-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={isFirst}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="text-sm text-muted-foreground">
              {currentQuestionIndex + 1} / {tool.questions.length}
            </div>

            <Button
              onClick={handleNext}
              disabled={!canNext}
              className="min-w-[120px]"
            >
              {isLast ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Complete
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

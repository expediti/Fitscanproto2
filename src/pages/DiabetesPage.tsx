import { useState } from "react";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import QuizModal from "@/components/QuizModal";
import ResultsModal from "@/components/ResultsModal";
import { healthTools, HealthTool } from "@/data/tools";

const DiabetesPage = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});

  // Find the diabetes tool from your tools data
  const diabetesTool = healthTools.find(t => t.id === 'diabetes-checker');

  const handleStartAssessment = () => {
    if (diabetesTool) {
      setShowQuiz(true);
    }
  };

  const handleQuizComplete = (score: number, answers: Record<string, string>) => {
    setQuizScore(score);
    setQuizAnswers(answers);
    setShowQuiz(false);
    setShowResults(true);
  };

  const handleCloseResults = () => {
    setShowResults(false);
    setQuizScore(0);
    setQuizAnswers({});
  };

  const handleCloseQuiz = () => {
    setShowQuiz(false);
  };

  const handleBackHome = () => {
    window.close(); // Close this window
    // Or redirect to home: window.location.href = '/';
  };

  if (!diabetesTool) {
    return <div>Tool not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <section className="py-12 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Button */}
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={handleBackHome}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Health Tools</span>
            </Button>
          </div>

          {/* Tool Info */}
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🩺</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              {diabetesTool.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
              {diabetesTool.description}
            </p>
            
            <div className="flex justify-center items-center space-x-6 text-sm text-gray-500 mb-8">
              <span>⏱️ {diabetesTool.estimatedTime}</span>
              <span>📊 {diabetesTool.difficulty} Level</span>
              <span>🎯 {diabetesTool.category}</span>
            </div>

            <Button 
              onClick={handleStartAssessment}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
            >
              Start Diabetes Assessment
            </Button>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">What This Assessment Covers</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✅ Diabetes risk factors and symptoms</li>
                <li>✅ Lifestyle and family history evaluation</li>
                <li>✅ Personalized risk assessment</li>
                <li>✅ Professional recommendations</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">How It Works</h3>
              <ul className="space-y-2 text-gray-700">
                <li>1️⃣ Answer 8 comprehensive questions</li>
                <li>2️⃣ Get your personalized risk score</li>
                <li>3️⃣ Receive tailored recommendations</li>
                <li>4️⃣ Print your results for your doctor</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Important Note</h4>
            <p className="text-yellow-700 text-sm">
              This assessment is for informational purposes only and is not a substitute for professional medical advice. 
              Always consult with a healthcare provider for proper diagnosis and treatment.
            </p>
          </div>
        </div>
      </section>

      {/* Modals - Same as your homepage */}
      {diabetesTool && showQuiz && (
        <QuizModal
          tool={diabetesTool}
          onComplete={handleQuizComplete}
          onClose={handleCloseQuiz}
        />
      )}

      {diabetesTool && showResults && (
        <ResultsModal
          tool={diabetesTool}
          score={quizScore}
          answers={quizAnswers}
          onClose={handleCloseResults}
        />
      )}
    </div>
  );
};

export default DiabetesPage;

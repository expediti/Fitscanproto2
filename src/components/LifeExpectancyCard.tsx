import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface LifeExpectancyProps {
  userAge: number;
  totalScore: number;
  maxScore: number;
  gender: string;
  answers: Record<string, string>;
}

export default function LifeExpectancyCard({ userAge, totalScore, maxScore, gender, answers }: LifeExpectancyProps) {
  
  const calculateLifeExpectancy = () => {
    // Base life expectancy for India
    const baseExpectancy = gender.toLowerCase() === 'male' ? 70.8 : 74.2;
    
    // Calculate risk percentage
    const riskPercentage = (totalScore / maxScore) * 100;
    
    // Risk adjustment (-15 to +8 years based on lifestyle)
    const riskAdjustment = Math.max(-15, Math.min(8, (30 - riskPercentage) * 0.4));
    
    const predictedAge = baseExpectancy + riskAdjustment;
    const remainingYears = Math.max(0, predictedAge - userAge);
    
    return {
      predictedAge: Math.round(predictedAge * 10) / 10,
      remainingYears: Math.round(remainingYears * 10) / 10,
      baseExpectancy,
      difference: Math.round((predictedAge - baseExpectancy) * 10) / 10
    };
  };

  const analyzeLifestyleImpacts = () => {
    const impacts = [];
    
    // Smoking impact
    if (answers.smoking_habits === 'heavy') {
      impacts.push({ factor: '🚬 Heavy smoking', impact: -6.2, color: 'bg-red-50 text-red-700 border-red-200' });
    } else if (answers.smoking_habits === 'light') {
      impacts.push({ factor: '🚬 Light smoking', impact: -2.8, color: 'bg-red-50 text-red-700 border-red-200' });
    }
    
    // Exercise impact
    if (answers.exercise_frequency === 'rarely') {
      impacts.push({ factor: '🏃‍♂️ Lack of exercise', impact: -4.1, color: 'bg-orange-50 text-orange-700 border-orange-200' });
    } else if (answers.exercise_frequency === 'daily') {
      impacts.push({ factor: '💪 Regular exercise', impact: +3.2, color: 'bg-green-50 text-green-700 border-green-200' });
    }
    
    // Sleep impact
    if (answers.sleep_hours === 'very_less') {
      impacts.push({ factor: '😴 Severe sleep deprivation', impact: -3.5, color: 'bg-purple-50 text-purple-700 border-purple-200' });
    } else if (answers.sleep_hours === 'less') {
      impacts.push({ factor: '😴 Poor sleep', impact: -1.8, color: 'bg-purple-50 text-purple-700 border-purple-200' });
    }
    
    // Diet impact
    if (answers.diet_quality === 'very_poor') {
      impacts.push({ factor: '🍔 Very poor diet', impact: -3.9, color: 'bg-red-50 text-red-700 border-red-200' });
    } else if (answers.diet_quality === 'excellent') {
      impacts.push({ factor: '🥗 Excellent diet', impact: +2.7, color: 'bg-green-50 text-green-700 border-green-200' });
    }
    
    // Stress impact  
    if (answers.stress_levels === 'very_high') {
      impacts.push({ factor: '😰 Very high stress', impact: -2.4, color: 'bg-red-50 text-red-700 border-red-200' });
    }
    
    return impacts;
  };

  const lifeExpectancy = calculateLifeExpectancy();
  const impacts = analyzeLifestyleImpacts();

  return (
    <>
      {/* Main Life Expectancy Card */}
      <Card className="mb-8 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white border-0 shadow-2xl">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl">🔮</span>
          </div>
          <CardTitle className="text-2xl md:text-3xl font-bold">Your Life Expectancy Prediction</CardTitle>
          <p className="text-blue-100 text-sm">Based on your lifestyle and health assessment</p>
        </CardHeader>
        
        <CardContent className="text-center pb-8">
          {/* Main Prediction */}
          <div className="mb-6">
            <div className="text-7xl md:text-8xl font-bold mb-2 text-white drop-shadow-lg">
              {lifeExpectancy.predictedAge}
            </div>
            <div className="text-xl md:text-2xl mb-1">years old</div>
            <div className="text-lg text-blue-100">
              That's approximately <span className="font-bold text-white">{lifeExpectancy.remainingYears} more years</span> to live!
            </div>
          </div>

          {/* Comparison */}
          <div className="bg-white/15 backdrop-blur rounded-xl p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-left">
                <div className="text-sm text-blue-100">Average person (your age)</div>
                <div className="text-2xl font-bold">{lifeExpectancy.baseExpectancy} years</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-blue-100">Your prediction</div>
                <div className="text-2xl font-bold">{lifeExpectancy.predictedAge} years</div>
              </div>
            </div>
            
            <div className="text-center">
              {lifeExpectancy.difference >= 0 ? (
                <Badge className="bg-green-500 text-white text-lg px-4 py-2">
                  🎉 You're living {Math.abs(lifeExpectancy.difference)} years longer than average!
                </Badge>
              ) : (
                <Badge className="bg-red-500 text-white text-lg px-4 py-2">
                  ⚠️ You could gain {Math.abs(lifeExpectancy.difference)} years with better habits
                </Badge>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold">{Math.round(lifeExpectancy.remainingYears * 365)}</div>
              <div className="text-sm text-blue-100">Days remaining</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold">{Math.round(lifeExpectancy.remainingYears * 52)}</div>
              <div className="text-sm text-blue-100">Weeks remaining</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lifestyle Impact Breakdown */}
      {impacts.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              💀 What's Affecting Your Lifespan
            </CardTitle>
            <p className="text-sm text-gray-600">Here's how your lifestyle choices are impacting your predicted lifespan</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {impacts.map((impact, index) => (
                <div key={index} className={`flex justify-between items-center p-4 rounded-lg border-2 ${impact.color}`}>
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{impact.factor}</span>
                  </div>
                  <div className="text-right">
                    <span className={`text-lg font-bold ${impact.impact > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {impact.impact > 0 ? '+' : ''}{impact.impact} years
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">💡 Want to improve your lifespan?</h4>
              <p className="text-sm text-blue-700">
                Small lifestyle changes can add years to your life! Consider quitting smoking, exercising regularly, 
                improving your sleep, and managing stress. Every positive change counts!
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}

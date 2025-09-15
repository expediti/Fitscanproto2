import { X, AlertTriangle, CheckCircle, Info, Heart, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { HealthTool } from "@/data/tools";

interface ResultsModalProps {
  tool: HealthTool;
  score: number;
  answers: Record<string, string>;
  onClose: () => void;
}

const ResultsModal = ({ tool, score, answers, onClose }: ResultsModalProps) => {
  // Calculate maximum possible score
  const maxScore = tool.questions.reduce((max, question) => {
    const maxOptionValue = Math.max(...question.options.map(opt => opt.value));
    return max + maxOptionValue;
  }, 0);

  const percentage = (score / maxScore) * 100;

  const getRiskLevel = (percentage: number, toolId: string) => {
    if (toolId === 'diabetes-checker') {
      if (percentage <= 20) return { level: "Low", color: "success", icon: CheckCircle };
      if (percentage <= 45) return { level: "Mild", color: "warning", icon: Info };
      if (percentage <= 70) return { level: "Moderate", color: "warning", icon: AlertTriangle };
      return { level: "High", color: "destructive", icon: AlertTriangle };
    }
    
    // Default scoring
    if (percentage <= 25) return { level: "Low", color: "success", icon: CheckCircle };
    if (percentage <= 50) return { level: "Mild", color: "warning", icon: Info };
    if (percentage <= 75) return { level: "Moderate", color: "warning", icon: AlertTriangle };
    return { level: "High", color: "destructive", icon: AlertTriangle };
  };

  const riskAssessment = getRiskLevel(percentage, tool.id);
  const IconComponent = riskAssessment.icon;

  const getRecommendations = (toolId: string, riskLevel: string) => {
    const diabetesRecommendations = {
      "Low": [
        "Continue maintaining a healthy lifestyle with regular exercise",
        "Follow a balanced diet rich in whole foods and low in processed sugars",
        "Schedule regular health check-ups to monitor your wellness",
        "Stay hydrated and maintain a healthy weight"
      ],
      "Mild": [
        "Monitor your symptoms and lifestyle habits more closely",
        "Consider consulting with a healthcare provider about diabetes screening",
        "Implement dietary changes to reduce sugar and refined carb intake",
        "Increase physical activity to at least 30 minutes daily"
      ],
      "Moderate": [
        "Schedule an appointment with your healthcare provider for proper evaluation",
        "Request diabetes screening tests (fasting glucose, HbA1c)",
        "Consider working with a nutritionist for meal planning",
        "Track your symptoms and blood sugar if recommended by your doctor"
      ],
      "High": [
        "Contact your healthcare provider promptly for immediate evaluation",
        "Request comprehensive diabetes testing as soon as possible",
        "Do not ignore these symptoms - early intervention is crucial",
        "Consider emergency care if symptoms are severe or worsening rapidly"
      ]
    };

    if (toolId === 'diabetes-checker') {
      return diabetesRecommendations[riskLevel as keyof typeof diabetesRecommendations] || diabetesRecommendations["Low"];
    }

    // Default recommendations for other tools
    const baseRecommendations = {
      "Low": [
        "Continue maintaining healthy habits",
        "Schedule regular check-ups with your healthcare provider",
        "Stay aware of any changes in your symptoms"
      ],
      "Mild": [
        "Monitor your symptoms closely",
        "Consider lifestyle modifications",
        "Discuss with your healthcare provider if symptoms persist"
      ],
      "Moderate": [
        "Schedule an appointment with your healthcare provider",
        "Track your symptoms daily",
        "Implement recommended lifestyle changes"
      ],
      "High": [
        "Seek medical attention promptly",
        "Contact your healthcare provider today",
        "Do not ignore these symptoms"
      ]
    };

    return baseRecommendations[riskLevel as keyof typeof baseRecommendations] || baseRecommendations["Low"];
  };

  const recommendations = getRecommendations(tool.id, riskAssessment.level);

  const getResultMessage = (toolId: string, riskLevel: string) => {
    if (toolId === 'diabetes-checker') {
      const messages = {
        "Low": "Your responses suggest a low risk for diabetes. Keep maintaining your healthy lifestyle!",
        "Mild": "You have some symptoms that may warrant attention. Consider discussing with a healthcare provider.",
        "Moderate": "Your symptoms suggest you should consult with a healthcare provider about diabetes screening.",
        "High": "Your symptoms are concerning and require medical evaluation for proper diabetes assessment."
      };
      return messages[riskLevel as keyof typeof messages] || messages["Low"];
    }
    
    const messages = {
      "Low": "Your symptoms appear to be minimal. Continue monitoring your health.",
      "Mild": "You have some symptoms that warrant attention but are not immediately concerning.",
      "Moderate": "Your symptoms suggest you should consult with a healthcare provider.",
      "High": "Your symptoms are concerning and require medical evaluation."
    };
    
    return messages[riskLevel as keyof typeof messages] || messages["Low"];
  };

  const handlePrintResults = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${tool.title} - Assessment Results - FitScan</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                margin: 0; 
                padding: 20px;
                line-height: 1.6;
              }
              .print-header { 
                text-align: center; 
                margin-bottom: 30px;
                border-bottom: 3px solid #3b82f6;
                padding-bottom: 20px;
              }
              .logo-section {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 15px;
              }
              .logo-img {
                width: 60px;
                height: 60px;
                margin-right: 15px;
                border-radius: 8px;
                object-fit: contain;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
              }
              .site-name {
                font-size: 28px;
                font-weight: bold;
                color: #1f2937;
                margin: 0;
              }
              .site-tagline {
                font-size: 14px;
                color: #6b7280;
                margin: 5px 0 0 0;
              }
              .assessment-title {
                font-size: 24px;
                color: #374151;
                margin: 20px 0 10px 0;
              }
              .print-date {
                font-size: 12px;
                color: #9ca3af;
                margin: 0;
              }
              .risk-level { 
                background: #f9fafb; 
                border: 2px solid #e5e7eb;
                padding: 20px; 
                border-radius: 12px; 
                margin: 25px 0;
                text-align: center;
              }
              .risk-high { border-color: #ef4444; background: #fef2f2; }
              .risk-moderate { border-color: #f59e0b; background: #fffbeb; }
              .risk-mild { border-color: #f59e0b; background: #fffbeb; }
              .risk-low { border-color: #10b981; background: #f0fdf4; }
              .score-section { 
                text-align: center; 
                font-size: 18px; 
                margin: 25px 0;
                background: #f8fafc;
                padding: 15px;
                border-radius: 8px;
              }
              .recommendations { 
                margin: 25px 0; 
              }
              .recommendations h3 {
                color: #374151;
                border-bottom: 2px solid #e5e7eb;
                padding-bottom: 8px;
              }
              .recommendations ul { 
                list-style-type: none; 
                padding-left: 0; 
              }
              .recommendations li {
                background: #f8fafc;
                margin: 8px 0;
                padding: 12px;
                border-left: 4px solid #3b82f6;
                border-radius: 4px;
              }
              .disclaimer { 
                background: #fff3cd; 
                border: 2px solid #ffeaa7; 
                padding: 20px; 
                border-radius: 12px; 
                margin-top: 30px;
              }
              .disclaimer h4 {
                color: #856404;
                margin-top: 0;
              }
              .footer {
                text-align: center;
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                font-size: 12px;
                color: #6b7280;
              }
              @media print {
                body { margin: 0; }
                .print-header { page-break-inside: avoid; }
                .logo-img { 
                  -webkit-print-color-adjust: exact;
                  print-color-adjust: exact;
                }
              }
            </style>
          </head>
          <body>
            <div class="print-header">
              <div class="logo-section">
                <img src="${window.location.origin}/logo.png" alt="FitScan Logo" class="logo-img" />
                <div>
                  <h1 class="site-name">FitScan</h1>
                  <p class="site-tagline">Your Trusted Health Assessment Platform</p>
                </div>
              </div>
              <h2 class="assessment-title">${tool.title}</h2>
              <h3 style="color: #374151; margin: 10px 0;">Assessment Results</h3>
              <p class="print-date">Generated on: ${new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
            </div>
            
            <div class="score-section">
              <strong>Your Assessment Score: ${score} out of ${maxScore} (${Math.round(percentage)}%)</strong>
            </div>
            
            <div class="risk-level risk-${riskAssessment.level.toLowerCase()}">
              <h3 style="margin-top: 0; font-size: 20px;">Risk Level: ${riskAssessment.level}</h3>
              <p style="margin-bottom: 0; font-size: 16px;">${getResultMessage(tool.id, riskAssessment.level)}</p>
            </div>
            
            <div class="recommendations">
              <h3>📋 Personalized Recommendations:</h3>
              <ul>
                ${recommendations.map(rec => `<li>• ${rec}</li>`).join('')}
              </ul>
            </div>
            
            <div class="disclaimer">
              <h4>⚠️ Important Medical Disclaimer</h4>
              <p style="margin: 0;">This assessment is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for proper medical evaluation and personalized healthcare decisions.</p>
            </div>
            
            <div class="footer">
              <p><strong>FitScan Health Assessment Platform</strong></p>
              <p>For more health tools and assessments, visit our platform</p>
              <p style="margin-top: 10px;">This report is confidential and intended for the individual who completed the assessment.</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                riskAssessment.color === "success" ? "bg-green-100 text-green-700" :
                riskAssessment.color === "warning" ? "bg-yellow-100 text-yellow-700" :
                "bg-red-100 text-red-700"
              }`}>
                <IconComponent className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Assessment Results</h2>
                <p className="text-muted-foreground">{tool.title}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="w-8 h-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Risk Level */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Risk Level</span>
              <Badge 
                variant="outline" 
                className={`${
                  riskAssessment.color === "success" ? "border-green-500 text-green-700" :
                  riskAssessment.color === "warning" ? "border-yellow-500 text-yellow-700" :
                  "border-red-500 text-red-700"
                }`}
              >
                {riskAssessment.level} Risk
              </Badge>
            </div>
            <Progress 
              value={percentage} 
              className={`h-3 ${
                riskAssessment.color === "success" ? "[&>div]:bg-green-500" :
                riskAssessment.color === "warning" ? "[&>div]:bg-yellow-500" :
                "[&>div]:bg-red-500"
              }`}
            />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>Score: {score}/{maxScore}</span>
              <span>{Math.round(percentage)}%</span>
            </div>
          </div>

          {/* Result Message */}
          <div className="mb-6 p-4 rounded-lg bg-muted/50">
            <p className="text-center font-medium">
              {getResultMessage(tool.id, riskAssessment.level)}
            </p>
          </div>

          {/* Recommendations */}
          <div className="mb-6">
            <h3 className="font-semibold mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-primary" />
              Recommendations
            </h3>
            <div className="space-y-3">
              {recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-card border">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-sm">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mb-6 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
            <div className="flex items-start space-x-2">
              <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-yellow-800 mb-1">Important Disclaimer</p>
                <p className="text-yellow-700">
                  This assessment is for informational purposes only and is not a substitute for professional medical advice. 
                  Always consult with a qualified healthcare provider for proper diagnosis and treatment.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={onClose}>
              Close Results
            </Button>
            <div className="space-x-2">
              <Button 
                variant="outline" 
                onClick={handlePrintResults}
                className="flex items-center space-x-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Results</span>
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Find a Doctor
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResultsModal;

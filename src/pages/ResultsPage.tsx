import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Home, Download, RotateCcw, CheckCircle, AlertTriangle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import PatientInfoModal from "@/components/PatientInfoModal";
import { getToolById, HealthTool } from "@/data/tools";
import LifeExpectancyCard from "@/components/LifeExpectancyCard";

interface LocationState {
  answers: Record<string, string>;
  score: number;
  tool: HealthTool;
}

interface PatientInfo {
  name: string;
  age: string;
  sex: string;
  contactNumber: string;
  dateOfBirth: string;
}

// Custom Circular Progress Component
const CircularRiskIndicator = ({ percentage, riskLevel }: { percentage: number; riskLevel: string }) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 500);
    return () => clearTimeout(timer);
  }, [percentage]);

  const getRiskConfig = (level: string) => {
    const configs = {
      high: {
        color: '#dc2626',
        bgColor: '#fef2f2',
        icon: AlertCircle,
        label: 'HIGH RISK'
      },
      moderate: {
        color: '#d97706',
        bgColor: '#fffbeb',
        icon: AlertTriangle,
        label: 'MODERATE'
      },
      low: {
        color: '#16a34a',
        bgColor: '#f0fdf4',
        icon: CheckCircle,
        label: 'LOW RISK'
      }
    };
    return configs[level as keyof typeof configs] || configs.low;
  };

  const config = getRiskConfig(riskLevel);
  const Icon = config.icon;

  const radius = 60;
  const strokeWidth = 6;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

  return (
    <div className="flex items-center gap-4 print:scale-75">
      <div className="relative">
        <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
          <circle
            stroke="#e5e7eb"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke={config.color}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            style={{
              strokeDashoffset,
              transition: 'stroke-dashoffset 2s ease-in-out'
            }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Icon className="h-6 w-6 mb-1" style={{ color: config.color }} />
          <div className="text-lg font-bold" style={{ color: config.color }}>
            {percentage}%
          </div>
        </div>
      </div>
      <div>
        <div className="text-sm font-semibold">{config.label}</div>
        <div className="text-xs text-gray-600">Risk Assessment</div>
      </div>
    </div>
  );
};

export default function ResultsPage() {
  const { toolId } = useParams<{ toolId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [tool, setTool] = useState<HealthTool | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const state = location.state as LocationState;

    if (state && state.tool && state.answers) {
      setTool(state.tool);
      setScore(state.score);
      setAnswers(state.answers);
    } else if (toolId) {
      const foundTool = getToolById(toolId);
      if (foundTool) {
        setTool(foundTool);
      } else {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [toolId, location.state, navigate]);

  if (!tool) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <Navigation />
        <div className="text-center mt-20">
          <div className="animate-spin h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading results...</p>
        </div>
      </div>
    );
  }

  const maxScore = tool.questions.reduce((sum, q) => {
    const maxVal = Math.max(...q.options.map(o => o.value));
    return sum + maxVal;
  }, 0);

  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

  const getRiskLevel = (percentage: number) => {
    if (percentage >= 70) return "high";
    if (percentage >= 40) return "moderate";
    return "low";
  };

  const riskLevel = getRiskLevel(percentage);
  const recommendations = tool.recommendations?.[riskLevel as keyof typeof tool.recommendations];

  const handlePrint = () => {
    if (!patientInfo) {
      setShowModal(true);
    } else {
      setTimeout(() => {
        window.print();
      }, 100);
    }
  };

  const handlePatientInfoSubmit = (info: PatientInfo) => {
    setPatientInfo(info);
    setShowModal(false);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  const handleRetake = () => {
    navigate(`/quiz/${toolId}`);
  };

  const currentDate = new Date();
  const reportId = Math.random().toString(36).substr(2, 9).toUpperCase();

  // Get answered questions details
  const answeredQuestions = tool.questions.map(q => {
    const answerId = answers[q.id];
    const selectedOption = q.options.find(opt => opt.id === answerId);
    return {
      question: q.text,
      answer: selectedOption?.text || "Not answered",
      score: selectedOption?.value || 0
    };
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ENHANCED PRINT STYLES WITH LOGO AND PREMIUM BRANDING */}
      <style>{`
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          body {
            margin: 0 !important;
            padding: 12mm !important;
            background: white !important;
            color: black !important;
            font-family: "Segoe UI", Arial, sans-serif !important;
            font-size: 10pt !important;
            line-height: 1.4 !important;
          }

          .no-print {
            display: none !important;
          }

          .print-container {
            background: white !important;
            color: black !important;
          }

          .print-header {
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%) !important;
            color: white !important;
            padding: 20px !important;
            margin-bottom: 12px !important;
            border-radius: 8px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
          }

          .print-logo {
            display: flex !important;
            align-items: center !important;
            gap: 12px !important;
          }

          .logo-container {
            width: 50px !important;
            height: 50px !important;
            background: white !important;
            border-radius: 8px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            font-size: 20pt !important;
            font-weight: bold !important;
            color: #1e40af !important;
          }

          .brand-info h1 {
            font-size: 22pt !important;
            font-weight: bold !important;
            margin: 0 0 4px 0 !important;
            color: white !important;
          }

          .brand-info p {
            font-size: 11pt !important;
            margin: 0 !important;
            opacity: 0.9 !important;
            color: white !important;
          }

          .report-meta {
            text-align: right !important;
            font-size: 9pt !important;
            color: white !important;
          }

          .info-section {
            background: #f8fafc !important;
            border: 1px solid #e2e8f0 !important;
            border-left: 4px solid #3b82f6 !important;
            padding: 12px !important;
            margin-bottom: 10px !important;
            border-radius: 6px !important;
          }

          .info-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 10px !important;
            font-size: 9pt !important;
          }

          .info-row {
            display: flex !important;
            justify-content: space-between !important;
            padding: 4px 0 !important;
            border-bottom: 1px dotted #cbd5e1 !important;
          }

          .section-title {
            font-size: 13pt !important;
            font-weight: bold !important;
            color: #1e40af !important;
            margin: 12px 0 8px 0 !important;
            padding-bottom: 4px !important;
            border-bottom: 2px solid #3b82f6 !important;
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
          }

          .section-icon {
            width: 16px !important;
            height: 16px !important;
            background: #3b82f6 !important;
            border-radius: 3px !important;
            display: inline-block !important;
          }

          .question-item {
            background: #f1f5f9 !important;
            border-left: 3px solid #3b82f6 !important;
            padding: 8px !important;
            margin-bottom: 6px !important;
            font-size: 9pt !important;
            border-radius: 4px !important;
          }

          .risk-display {
            text-align: center !important;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%) !important;
            border: 2px solid #3b82f6 !important;
            padding: 20px !important;
            margin: 12px 0 !important;
            border-radius: 8px !important;
          }

          .recommendations-section {
            background: #fefce8 !important;
            border: 1px solid #eab308 !important;
            border-left: 4px solid #f59e0b !important;
            padding: 12px !important;
            margin: 10px 0 !important;
            border-radius: 6px !important;
          }

          .recommendation-item {
            font-size: 9pt !important;
            margin-bottom: 4px !important;
            padding-left: 18px !important;
            position: relative !important;
          }

          .recommendation-item::before {
            content: "▶" !important;
            position: absolute !important;
            left: 0 !important;
            color: #3b82f6 !important;
            font-size: 8pt !important;
          }

          .disclaimer-box {
            background: #fef2f2 !important;
            border: 1px solid #fecaca !important;
            border-left: 4px solid #ef4444 !important;
            padding: 10px !important;
            margin: 10px 0 !important;
            border-radius: 6px !important;
            font-size: 8pt !important;
            line-height: 1.3 !important;
          }

          .premium-footer {
            margin-top: 16px !important;
            padding: 16px !important;
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%) !important;
            color: white !important;
            border-radius: 8px !important;
            text-align: center !important;
            font-size: 8pt !important;
          }

          .footer-brand {
            font-size: 14pt !important;
            font-weight: bold !important;
            margin-bottom: 8px !important;
          }

          @page {
            size: A4 !important;
            margin: 12mm !important;
          }

          /* Remove empty pages */
          .page-break-before {
            page-break-before: avoid !important;
          }

          .page-break-after {
            page-break-after: avoid !important;
          }
        }
      `}</style>

      <Navigation className="no-print" />

      <div className="pt-20 px-4 print:pt-0 print:px-0 print-container">
        {/* Enhanced Print Header with Logo */}
        <div className="hidden print:block print-header">
          <div className="print-logo">
            <div className="logo-container">
              FS
            </div>
            <div className="brand-info">
              <h1>FitScan Health</h1>
              <p>Advanced Medical Assessment Platform</p>
            </div>
          </div>
          <div className="report-meta">
            <div><strong>{tool.title}</strong></div>
            <div>Report ID: {reportId}</div>
            <div>{currentDate.toLocaleDateString()}</div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto">
          {/* Navigation Header - Hidden in print */}
          <div className="flex items-center justify-between mb-8 no-print">
            <Button variant="outline" onClick={() => navigate("/")}>
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleRetake}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Retake Quiz
              </Button>
              <Button variant="outline" onClick={handlePrint}>
                <Download className="h-4 w-4 mr-2" />
                Print Results
              </Button>
            </div>
          </div>
          {/* Patient Information - Print Only */}
          {patientInfo && (
            <div className="hidden print:block info-section">
              <div className="section-title">
                <span className="section-icon"></span>
                Patient Information
              </div>
              <div className="info-grid">
                <div className="info-row"><strong>Name:</strong> {patientInfo.name}</div>
                <div className="info-row"><strong>Patient ID:</strong> {reportId}</div>
                <div className="info-row"><strong>Date of Birth:</strong> {patientInfo.dateOfBirth}</div>
                <div className="info-row"><strong>Report Date:</strong> {currentDate.toLocaleDateString()}</div>
                <div className="info-row"><strong>Age:</strong> {patientInfo.age} years</div>
                <div className="info-row"><strong>Assessment Type:</strong> {tool.title}</div>
                <div className="info-row"><strong>Sex:</strong> {patientInfo.sex}</div>
                <div className="info-row"><strong>Category:</strong> {tool.category}</div>
                <div className="info-row"><strong>Contact:</strong> {patientInfo.contactNumber}</div>
                <div className="info-row"><strong>Platform:</strong> FitScan Health</div>
              </div>
            </div>
          )}
          {/* Assessment Summary - Print Only */}
          <div className="hidden print:block info-section">
            <div className="section-title">
              <span className="section-icon"></span>
              Assessment Summary
            </div>
            <p style={{ fontSize: '9pt', lineHeight: '1.4', margin: '0' }}>
              This comprehensive medical report documents the results of a {tool.difficulty.toLowerCase()} difficulty
              {tool.category.toLowerCase()} assessment completed by {patientInfo?.name || '[Patient Name]'} on {currentDate.toLocaleDateString()}.
              The assessment utilized our advanced AI-powered diagnostic algorithms to evaluate {tool.questions.length} key health parameters
              with an estimated completion time of {tool.estimatedTime}. This report provides evidence-based recommendations
              for optimal health management.
            </p>
          </div>
          {/* Detailed Assessment Responses - Print Only */}
          <div className="hidden print:block info-section">
            <div className="section-title">
              <span className="section-icon"></span>
              Detailed Assessment Responses
            </div>
            {answeredQuestions.map((qa, index) => (
              <div key={index} className="question-item">
                <strong>Q{index + 1}:</strong> {qa.question}
                <br />
                <strong>Response:</strong> {qa.answer}
                <span style={{ color: '#6b7280', fontSize: '8pt', marginLeft: '8px' }}>
                  (Risk Score: {qa.score})
                </span>
              </div>
            ))}
          </div>
          {/* Results Display - Screen Only */}
          <Card className="mb-8 print:hidden">
            <CardHeader>
              <CardTitle className="text-xl">Assessment Results Summary</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center py-8">
              <div className="text-center">
                <CircularRiskIndicator percentage={percentage} riskLevel={riskLevel} />
                <div className="mt-6 text-center">
                  <div className="text-sm text-muted-foreground mb-2">
                    <strong>Final Score:</strong> {score} out of {maxScore} points ({percentage}%)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add this component in your JSX where results are displayed (after circular risk display and before recommendations) */}
          {patientInfo && (
            <LifeExpectancyCard
              userAge={parseInt(patientInfo.age)}
              totalScore={score}
              maxScore={maxScore}
              gender={patientInfo.sex}
              answers={answers}
            />
          )}

          {/* Print Results Summary */}
          <div className="hidden print:block risk-display">
            <div className="section-title" style={{ margin: '0 0 12px 0', border: 'none' }}>
              <span className="section-icon"></span>
              Clinical Assessment Results
            </div>
            <CircularRiskIndicator percentage={percentage} riskLevel={riskLevel} />
            <div style={{ marginTop: '12px', fontSize: '11pt' }}>
              <strong>Comprehensive Score:</strong> {score} out of {maxScore} points ({percentage}%)
            </div>
            <div style={{ marginTop: '6px', fontSize: '9pt', color: '#6b7280' }}>
              Based on {tool.questions.length} clinical parameters • AI-Powered Analysis
            </div>
          </div>
          {/* Enhanced Recommendations */}
          {recommendations && (
            <>
              <Card className="mb-8 print:hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {riskLevel === 'high' && <AlertCircle className="h-5 w-5 text-red-600" />}
                    {riskLevel === 'moderate' && <AlertTriangle className="h-5 w-5 text-yellow-600" />}
                    {riskLevel === 'low' && <CheckCircle className="h-5 w-5 text-green-600" />}
                    {recommendations.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground leading-relaxed mb-6">
                    {recommendations.advice}
                  </p>
                  <h4 className="font-semibold text-foreground mb-4">Recommended Actions:</h4>
                  <ul className="space-y-3">
                    {recommendations.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-foreground leading-relaxed">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              {/* Print Recommendations */}
              <div className="hidden print:block recommendations-section">
                <div className="section-title">
                  <span className="section-icon"></span>
                  {recommendations.title}
                </div>
                <div style={{ fontSize: '9pt', marginBottom: '10px', lineHeight: '1.4' }}>
                  <strong>Clinical Assessment:</strong> {recommendations.advice}
                </div>
                <div>
                  <strong style={{ fontSize: '10pt', color: '#1e40af' }}>Evidence-Based Treatment Recommendations:</strong>
                  {recommendations.suggestions.map((suggestion, index) => (
                    <div key={index} className="recommendation-item">
                      {suggestion}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          {/* Medical Disclaimer */}
          <Card className="mb-8 print:hidden">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Medical Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm leading-relaxed">
                <p><strong>Important Notice:</strong> This health assessment is for informational and educational purposes only.</p>
              </div>
            </CardContent>
          </Card>
          {/* Print Disclaimer */}
          <div className="hidden print:block disclaimer-box">
            <div style={{ fontSize: '9pt', fontWeight: 'bold', marginBottom: '6px', color: '#dc2626' }}>
              ⚠️ Medical Disclaimer & Legal Notice
            </div>
            <p style={{ margin: '0 0 6px 0' }}>
              <strong>Important:</strong> This assessment is for informational purposes only and should not replace
              professional medical advice, diagnosis, or treatment. Always consult qualified healthcare providers.
            </p>
            <p style={{ margin: '0' }}>
              <strong>Accuracy:</strong> Results based on established medical guidelines. Individual cases may vary.
              Emergency situations require immediate medical attention.
            </p>
          </div>
          {/* Action Buttons - Hidden in print */}
          <div className="text-center pb-8 no-print">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate("/")}>
                Take Another Assessment
              </Button>
              <Button size="lg" variant="outline" onClick={handleRetake}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Retake This Quiz
              </Button>
            </div>
          </div>
          {/* Premium Footer */}
          <div className="hidden print:block premium-footer">
            <div className="footer-brand">🏥 FitScan Health Assessment Platform</div>
            <div style={{ marginBottom: '8px' }}>
              Advanced AI-Powered Medical Diagnostics • Trusted by Healthcare Professionals
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '7pt' }}>
              <div>📧 hollyman2313@gmail.com</div>
              <div>🌐 www.fitscan.life</div>
              <div>👨‍💻 Developed by BroxGit</div>
            </div>
            <div style={{ marginTop: '8px', fontSize: '7pt', opacity: '0.8', borderTop: '1px solid rgba(255,255,255,0.3)', paddingTop: '6px' }}>
              Report Generated: {currentDate.toLocaleString()} • Confidential Medical Information • All Rights Reserved © 2025
            </div>
          </div>
        </div>
      </div>
      {/* Custom Patient Info Modal */}
      <PatientInfoModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handlePatientInfoSubmit}
      />
    </div>
  );
}

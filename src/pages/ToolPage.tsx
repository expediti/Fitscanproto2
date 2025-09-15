import { useMemo, useState } from "react";
import QuizModal from "@/components/QuizModal";
import type { HealthTool } from "@/data/tools";

interface ToolPageProps {
  tool: HealthTool;
  onClose: () => void;
}

export default function ToolPage({ tool, onClose }: ToolPageProps) {
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const maxScore = useMemo(() => {
    return (tool?.questions ?? []).reduce((sum, q) => {
      const maxVal = Math.max(...q.options.map((o) => Number(o.value) || 0));
      return sum + maxVal;
    }, 0);
  }, [tool]);

  const handleComplete = (finalScore: number, ans: Record<string, string>) => {
    setScore(finalScore);
    setAnswers(ans);
    setDone(true);
  };

  if (!tool) {
    return (
      <div className="p-6 text-center text-sm text-muted-foreground">
        Loading assessment...
      </div>
    );
  }

  return (
    <div className="relative">
      {!done ? (
        <QuizModal tool={tool} onClose={onClose} onComplete={handleComplete} />
      ) : (
        <div className="p-6 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">{tool.title}</h1>
          <p className="text-muted-foreground mb-4">{tool.description}</p>

          <div className="rounded-lg border p-4 mb-4">
            <div className="text-lg font-semibold">Based on your answers</div>
            <div className="mt-1 text-sm text-muted-foreground">
              Here is your result summary.
            </div>
            <div className="mt-4 flex items-end gap-3">
              <div className="text-3xl font-extrabold">{score}</div>
              <div className="text-muted-foreground">/ {maxScore}</div>
            </div>
            <div className="mt-1 text-xs text-muted-foreground uppercase tracking-wide">
              Risk Score
            </div>
          </div>

          {/* Disclaimer */}
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800">
            <strong>Disclaimer:</strong> This assessment is for informational purposes only and
            should not replace professional medical advice. Always consult with a qualified
            healthcare provider for proper diagnosis and treatment.
          </div>

          {/* Footer */}
          <div className="mt-6 text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} FitScan Health Assessment Platform - {window.location.origin}
            <br />
            Generated on: {new Date().toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
}

import { useEffect, useMemo, useState } from "react";
import { X, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import type { HealthTool, Question, Option } from "@/data/tools";

type AnswerMap = Record<string, string>;

interface QuizModalProps {
  tool: HealthTool;
  onClose: () => void;
  onComplete: (score: number, answers: AnswerMap) => void;
}

export default function QuizModal({ tool, onClose, onComplete }: QuizModalProps) {
  const [current, setCurrent] = useState<number>(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [selected, setSelected] = useState<string>("");

  // Defensive: ensure questions exist
  const questions: Question[] = useMemo(() => tool?.questions ?? [], [tool]);
  const total = questions.length || 1;
  const q = questions[current];
  const isFirst = current === 0;
  const isLast = current === total - 1;
  const canNext = selected !== "";

  // Precompute max possible score for percentage
  const maxScore = useMemo(() => {
    return questions.reduce((sum, question) => {
      const maxVal = Math.max(...question.options.map(o => Number(o.value) || 0));
      return sum + maxVal;
    }, 0);
  }, [questions]);

  // Progress percent
  const progress = Math.round(((current + 1) / total) * 100);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!q) return;

      // 1..6 select options
      if (e.key >= "1" && e.key <= "6") {
        const idx = Number(e.key) - 1;
        const opt = q.options[idx];
        if (opt) setSelected(opt.id);
      }
      if (e.key === "ArrowRight" || e.key === "Enter") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [q, selected, answers, current, total]);

  useEffect(() => {
    // Load prior selection when question changes
    const prev = answers[q?.id ?? ""] || "";
    setSelected(prev);
  }, [current, q?.id, answers]);

  const handleSelect = (optionId: string) => {
    setSelected(optionId);
  };

  const persistCurrentAnswer = (nextIndex?: number) => {
    if (!q) return answers;
    const newAnswers = { ...answers, [q.id]: selected };
    setAnswers(newAnswers);

    if (typeof nextIndex === "number") {
      // Prefill selected for the next question if previously answered
      const nq = questions[nextIndex];
      if (nq) {
        const prior = newAnswers[nq.id] ?? "";
        setSelected(prior);
      }
    }
    return newAnswers;
  };

  const computeTotalScore = (map: AnswerMap) => {
    return questions.reduce((sum, qu) => {
      const ans = map[qu.id];
      const opt = qu.options.find(o => o.id === ans);
      return sum + (Number(opt?.value) || 0);
    }, 0);
  };

  const handleNext = () => {
    if (!canNext) return;
    if (isLast) {
      const finalMap = persistCurrentAnswer();
      const score = computeTotalScore(finalMap || answers);
      onComplete(score, finalMap || answers);
      return;
    }
    const target = current + 1;
    persistCurrentAnswer(target);
    setCurrent(target);
  };

  const handlePrev = () => {
    if (isFirst) return;
    const target = current - 1;
    persistCurrentAnswer(target);
    setCurrent(target);
  };

  const handleClose = () => {
    setCurrent(0);
    setAnswers({});
    setSelected("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-background border">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">{tool.category}</Badge>
            <span className="text-sm text-muted-foreground">|</span>
            <span className="text-sm text-muted-foreground">
              Question {current + 1} of {total}
            </span>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close"
            className="p-2 rounded hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Progress */}
        <div className="px-4 pt-4">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Progress</span>
            <span>{progress}% Complete</span>
          </div>
          <Progress value={progress} />
        </div>

        {/* Question */}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-3">{q?.text}</h3>

          <div className="grid gap-2">
            {q?.options.map((opt: Option, idx: number) => {
              const active = selected === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  className={[
                    "w-full text-left rounded-md border p-3 transition",
                    active
                      ? "border-primary/60 bg-primary/5 ring-2 ring-primary/30"
                      : "hover:bg-muted"
                  ].join(" ")}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={[
                        "h-4 w-4 rounded-full border flex items-center justify-center",
                        active ? "border-primary" : "border-muted-foreground/30"
                      ].join(" ")}
                    >
                      {active && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
                    </div>
                    <div className="font-medium">
                      <span className="mr-1 text-xs text-muted-foreground">[{idx + 1}]</span>
                      {opt.text}
                    </div>
                  </div>
                  {opt.description && (
                    <p className="mt-1 text-sm text-muted-foreground">{opt.description}</p>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between p-4 border-t">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={isFirst}
            className="gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="text-sm text-muted-foreground">
            {current + 1} / {total}
          </div>

          <Button
            onClick={handleNext}
            disabled={!canNext}
            className="gap-1"
          >
            {isLast ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Complete Assessment
              </>
            ) : (
              <>
                Next
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}

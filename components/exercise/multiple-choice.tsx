"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { renderInlineKatex } from "@/lib/katex-render";

interface MultipleChoiceProps {
  question?: unknown;
  options?: unknown;
  correctIndex?: number;
  explanation?: unknown;
}

type Status = "idle" | "checked";

export function MultipleChoice({
  question,
  options,
  correctIndex,
  explanation,
}: MultipleChoiceProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const safeCorrectIndex = typeof correctIndex === "number" ? correctIndex : 0;
  const safeOptions = useMemo(
    () => (Array.isArray(options) ? options : []),
    [options]
  );
  const ariaLabel = useMemo(() => {
    const label = question == null ? "" : String(question);
    return label || "Multiple choice question";
  }, [question]);

  const isCorrect = status === "checked" && selectedIndex === safeCorrectIndex;

  const questionHtml = useMemo(() => renderInlineKatex(question), [question]);
  const optionHtmls = useMemo(
    () => safeOptions.map((option) => renderInlineKatex(option)),
    [safeOptions]
  );
  const explanationHtml = useMemo(
    () => (explanation ? renderInlineKatex(explanation) : undefined),
    [explanation]
  );

  const handleCheck = useCallback(() => {
    if (selectedIndex === null) return;
    setStatus("checked");
  }, [selectedIndex]);

  const handleReset = useCallback(() => {
    setSelectedIndex(null);
    setStatus("idle");
  }, []);

  function getOptionStyle(index: number) {
    if (status === "idle") {
      return index === selectedIndex
        ? "border-primary/60 bg-primary/5 ring-1 ring-primary/20"
        : "border-border hover:border-border/80 hover:bg-muted/50";
    }

    // Checked state
    if (index === safeCorrectIndex) {
      return "border-green-500/50 bg-green-500/8 ring-1 ring-green-500/20";
    }
    if (index === selectedIndex && index !== safeCorrectIndex) {
      return "border-red-500/50 bg-red-500/8 ring-1 ring-red-500/20";
    }
    return "border-border/50 opacity-50";
  }

  function getOptionIcon(index: number) {
    if (status !== "checked") return null;

    if (index === safeCorrectIndex) {
      return (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 25, delay: 0.1 }}
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/15"
        >
          <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
        </motion.div>
      );
    }
    if (index === selectedIndex && index !== safeCorrectIndex) {
      return (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 25, delay: 0.1 }}
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/15"
        >
          <X className="h-3 w-3 text-red-600 dark:text-red-400" />
        </motion.div>
      );
    }
    return null;
  }

  return (
    <div className="my-8 rounded-xl border border-border bg-card shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border px-5 py-4">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <span className="text-xs font-bold">Q</span>
        </div>
        <h4 className="text-sm font-semibold tracking-tight text-foreground">
          Multiple Choice
        </h4>
      </div>

      {/* Question */}
      <div className="px-5 pt-4 pb-2">
        <p className="text-sm leading-relaxed text-foreground/90" dangerouslySetInnerHTML={{ __html: questionHtml }} />
      </div>

      {/* Options */}
      <div className="flex flex-col gap-2 px-5 py-3" role="radiogroup" aria-label={ariaLabel}>
        {safeOptions.map((option, index) => {
          const letter = String.fromCharCode(65 + index);
          const isSelected = selectedIndex === index;
          const isDisabled = status === "checked";

          return (
            <motion.button
              key={index}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={isDisabled}
              onClick={() => !isDisabled && setSelectedIndex(index)}
              className={cn(
                "flex items-center gap-3 rounded-lg border px-4 py-3",
                "text-left text-sm transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "disabled:cursor-default",
                getOptionStyle(index)
              )}
              whileTap={!isDisabled ? { scale: 0.99 } : undefined}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              {/* Letter badge */}
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-medium",
                  isSelected && status === "idle"
                    ? "bg-primary/15 text-primary"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {letter}
              </span>

              {/* Option text */}
              <span className="flex-1" dangerouslySetInnerHTML={{ __html: optionHtmls[index] }} />

              {/* Feedback icon */}
              {getOptionIcon(index)}
            </motion.button>
          );
        })}
      </div>

      {/* Actions and explanation */}
      <div className="border-t border-border px-5 py-3">
        <div className="flex items-center gap-2">
          {status === "idle" ? (
            <Button
              size="sm"
              onClick={handleCheck}
              disabled={selectedIndex === null}
              className="gap-2"
            >
              <Check className="h-3.5 w-3.5" />
              Check Answer
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="gap-2"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Try Again
            </Button>
          )}

          {/* Inline result badge */}
          <AnimatePresence>
            {status === "checked" && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium",
                  isCorrect
                    ? "bg-green-500/10 text-green-600 dark:text-green-400"
                    : "bg-red-500/10 text-red-600 dark:text-red-400"
                )}
              >
                {isCorrect ? "Correct" : "Incorrect"}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Explanation */}
        <AnimatePresence initial={false}>
          {status === "checked" && explanationHtml && (
            <motion.div
              key="explanation"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { type: "spring", stiffness: 400, damping: 35 },
                opacity: { duration: 0.2, delay: 0.05 },
              }}
              className="overflow-hidden"
            >
              <div className="mt-3 rounded-lg border border-border/60 bg-muted/50 px-4 py-3">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Explanation
                </p>
                <p className="text-sm leading-relaxed text-foreground/90" dangerouslySetInnerHTML={{ __html: explanationHtml ?? "" }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

"use client";

import { useState, useCallback, useId, useMemo, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { renderInlineKatex } from "@/lib/katex-render";

interface NumericInputProps {
  question?: unknown;
  answer: number;
  tolerance?: number;
  units?: string;
  hint?: unknown;
}

type Status = "idle" | "correct" | "incorrect";

export function NumericInput({
  question,
  answer,
  tolerance = 0.01,
  units,
  hint,
}: NumericInputProps) {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const inputId = useId();

  const questionHtml = useMemo(() => renderInlineKatex(question), [question]);
  const hintHtml = useMemo(() => (hint ? renderInlineKatex(hint) : undefined), [hint]);

  const handleCheck = useCallback(
    (e?: FormEvent) => {
      e?.preventDefault();
      const parsed = parseFloat(value);
      if (isNaN(parsed)) return;

      if (Math.abs(parsed - answer) <= tolerance) {
        setStatus("correct");
      } else {
        setStatus("incorrect");
      }
    },
    [value, answer, tolerance]
  );

  const handleReset = useCallback(() => {
    setValue("");
    setStatus("idle");
  }, []);

  const canCheck = value.trim() !== "" && !isNaN(parseFloat(value));

  return (
    <div className="my-8 rounded-xl border border-border bg-card shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border px-5 py-4">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <span className="text-xs font-bold">#</span>
        </div>
        <h4 className="text-sm font-semibold tracking-tight text-foreground">
          Numeric Answer
        </h4>
      </div>

      {/* Question */}
      <div className="px-5 pt-4 pb-2">
        <label
          htmlFor={inputId}
          className="block text-sm leading-relaxed text-foreground/90"
          dangerouslySetInnerHTML={{ __html: questionHtml }}
        />
      </div>

      {/* Input area */}
      <form onSubmit={handleCheck} className="px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <input
              id={inputId}
              type="text"
              inputMode="decimal"
              value={value}
              onChange={(e) => {
                if (status !== "idle") return;
                setValue(e.target.value);
              }}
              readOnly={status !== "idle"}
              placeholder="Enter your answer..."
              className={cn(
                "h-10 w-full rounded-lg border px-3 text-sm",
                "bg-background text-foreground placeholder:text-muted-foreground/60",
                "transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                status === "idle" && "border-input",
                status === "correct" &&
                  "border-green-500/50 bg-green-500/5 ring-1 ring-green-500/20",
                status === "incorrect" &&
                  "border-red-500/50 bg-red-500/5 ring-1 ring-red-500/20"
              )}
              aria-describedby={units ? `${inputId}-units` : undefined}
              aria-invalid={status === "incorrect" ? true : undefined}
            />

            {/* Units label */}
            {units && (
              <span
                id={`${inputId}-units`}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground"
              >
                {units}
              </span>
            )}
          </div>

          {/* Feedback icon inline with input */}
          <AnimatePresence mode="wait">
            {status === "correct" && (
              <motion.div
                key="check"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/15"
              >
                <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
              </motion.div>
            )}
            {status === "incorrect" && (
              <motion.div
                key="x"
                initial={{ scale: 0, rotate: 90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -90 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500/15"
              >
                <X className="h-4 w-4 text-red-600 dark:text-red-400" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>

      {/* Actions, hint, and feedback */}
      <div className="border-t border-border px-5 py-3">
        <div className="flex items-center gap-2">
          {status === "idle" ? (
            <Button
              size="sm"
              onClick={() => handleCheck()}
              disabled={!canCheck}
              className="gap-2"
            >
              <Check className="h-3.5 w-3.5" />
              Check
            </Button>
          ) : status === "incorrect" ? (
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="gap-2"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Try Again
            </Button>
          ) : null}

          {/* Inline result badge */}
          <AnimatePresence>
            {status !== "idle" && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium",
                  status === "correct"
                    ? "bg-green-500/10 text-green-600 dark:text-green-400"
                    : "bg-red-500/10 text-red-600 dark:text-red-400"
                )}
              >
                {status === "correct"
                  ? "Correct"
                  : `Incorrect -- expected ${answer}${units ? ` ${units}` : ""}`}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Hint on incorrect */}
        <AnimatePresence initial={false}>
          {status === "incorrect" && hintHtml && (
            <motion.div
              key="hint"
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
                  Hint
                </p>
                <p className="text-sm leading-relaxed text-foreground/90" dangerouslySetInnerHTML={{ __html: hintHtml }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success message */}
        <AnimatePresence initial={false}>
          {status === "correct" && (
            <motion.div
              key="success"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { type: "spring", stiffness: 400, damping: 35 },
                opacity: { duration: 0.2, delay: 0.05 },
              }}
              className="overflow-hidden"
            >
              <div className="mt-3 rounded-lg border border-green-500/20 bg-green-500/5 px-4 py-3">
                <p className="text-sm leading-relaxed text-green-700 dark:text-green-300">
                  Well done. The answer is{" "}
                  <span className="font-semibold">
                    {answer}
                    {units ? ` ${units}` : ""}
                  </span>
                  {tolerance > 0 && (
                    <span className="text-green-600/70 dark:text-green-400/70">
                      {" "}
                      (tolerance: &plusmn;{tolerance})
                    </span>
                  )}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

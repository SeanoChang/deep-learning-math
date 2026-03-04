"use client";

import { useState, type ReactNode, Children, isValidElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Solution({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

interface ProblemProps {
  title: string;
  children: ReactNode;
}

function ProblemRoot({ title, children }: ProblemProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  // Separate children: Solution component vs problem statement
  const childArray = Children.toArray(children);
  const solutionChild = childArray.find(
    (child) => isValidElement(child) && child.type === Solution
  );
  const problemChildren = childArray.filter(
    (child) => !(isValidElement(child) && child.type === Solution)
  );

  return (
    <div className="my-8 rounded-xl border border-border bg-card shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border px-5 py-4">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <span className="text-xs font-bold">P</span>
        </div>
        <h4 className="text-sm font-semibold tracking-tight text-foreground">
          {title}
        </h4>
      </div>

      {/* Problem statement */}
      <div className="px-5 py-4 text-sm leading-relaxed text-foreground/90 [&>p]:my-2 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
        {problemChildren}
      </div>

      {/* Solution toggle */}
      <div className="border-t border-border px-5 py-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsRevealed((prev) => !prev)}
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <motion.div
            initial={false}
            animate={{ rotate: isRevealed ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {isRevealed ? (
              <EyeOff className="h-3.5 w-3.5" />
            ) : (
              <Eye className="h-3.5 w-3.5" />
            )}
          </motion.div>
          {isRevealed ? "Hide Solution" : "Show Solution"}
        </Button>

        <AnimatePresence initial={false}>
          {isRevealed && solutionChild && (
            <motion.div
              key="solution"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { type: "spring", stiffness: 400, damping: 35 },
                opacity: { duration: 0.2 },
              }}
              className="overflow-hidden"
            >
              <div
                className={cn(
                  "mt-3 rounded-lg border border-border/60",
                  "bg-muted/50 px-5 py-4",
                  "text-sm leading-relaxed text-foreground/90",
                  "[&>p]:my-2 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0"
                )}
              >
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Solution
                </p>
                {solutionChild}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export const Problem = Object.assign(ProblemRoot, { Solution });

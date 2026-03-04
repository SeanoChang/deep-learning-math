"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { Mafs, Coordinates, Plot, Point, Theme, vec } from "mafs";
import "mafs/core.css";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, StepForward } from "lucide-react";
import { cn } from "@/lib/utils";

interface GradientDescentProps {
  fn?: string;
  derivative?: string;
  startX?: number;
  title?: string;
}

export function GradientDescent({
  fn = "x * x",
  derivative = "2 * x",
  startX = 4,
  title = "Gradient Descent Visualization",
}: GradientDescentProps) {
  const [x, setX] = useState(startX);
  const [history, setHistory] = useState<[number, number][]>([]);
  const [learningRate, setLearningRate] = useState(0.1);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const evalFn = useMemo(() => {
    try {
      return new Function("x", `"use strict"; return (${fn});`) as (
        x: number
      ) => number;
    } catch {
      return (x: number) => x * x;
    }
  }, [fn]);

  const evalDerivative = useMemo(() => {
    try {
      return new Function("x", `"use strict"; return (${derivative});`) as (
        x: number
      ) => number;
    } catch {
      return (x: number) => 2 * x;
    }
  }, [derivative]);

  const y = evalFn(x);
  const grad = evalDerivative(x);

  const step = useCallback(() => {
    setX((prev) => {
      const g = evalDerivative(prev);
      const newX = prev - learningRate * g;
      setHistory((h) => [...h, [prev, evalFn(prev)]]);
      return newX;
    });
  }, [learningRate, evalDerivative, evalFn]);

  const reset = useCallback(() => {
    setX(startX);
    setHistory([]);
    setIsPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [startX]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(step, 500);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, step]);

  return (
    <div className="my-6">
      {title && (
        <p className="mb-2 text-sm font-medium text-muted-foreground">
          {title}
        </p>
      )}
      <div className="rounded-lg border border-border overflow-hidden bg-background">
        <Mafs
          viewBox={{ x: [-5, 5], y: [-2, 20] }}
          preserveAspectRatio={false}
          height={300}
        >
          <Coordinates.Cartesian />
          <Plot.OfX y={evalFn} color={Theme.blue} />

          {/* Trail of previous positions */}
          {history.map(([hx, hy], i) => (
            <Point
              key={i}
              x={hx}
              y={hy}
              color={Theme.blue}
              opacity={0.3}
            />
          ))}

          {/* Current position */}
          <Point x={x} y={y} color={Theme.red} />
        </Mafs>

        {/* Controls */}
        <div className="border-t border-border p-4 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Button size="sm" variant="outline" onClick={step} className="gap-1.5">
              <StepForward className="h-3.5 w-3.5" />
              Step
            </Button>
            <Button
              size="sm"
              variant={isPlaying ? "destructive" : "default"}
              onClick={() => setIsPlaying(!isPlaying)}
              className="gap-1.5"
            >
              {isPlaying ? (
                <Pause className="h-3.5 w-3.5" />
              ) : (
                <Play className="h-3.5 w-3.5" />
              )}
              {isPlaying ? "Pause" : "Play"}
            </Button>
            <Button size="sm" variant="ghost" onClick={reset} className="gap-1.5">
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs text-muted-foreground shrink-0">
              Learning rate: {learningRate.toFixed(2)}
            </label>
            <input
              type="range"
              min="0.01"
              max="0.5"
              step="0.01"
              value={learningRate}
              onChange={(e) => setLearningRate(parseFloat(e.target.value))}
              className="flex-1 h-1.5 accent-primary"
            />
          </div>

          <div className="flex gap-6 text-xs text-muted-foreground font-mono">
            <span>x = {x.toFixed(4)}</span>
            <span>f(x) = {y.toFixed(4)}</span>
            <span>f&apos;(x) = {grad.toFixed(4)}</span>
            <span>steps: {history.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

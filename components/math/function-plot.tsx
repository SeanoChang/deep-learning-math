"use client";

import { useMemo, useState } from "react";
import { Mafs, Coordinates, Plot, Theme } from "mafs";
import "mafs/core.css";
import { cn } from "@/lib/utils";

interface FunctionPlotProps {
  fn: string;
  title?: string;
  domain?: [number, number];
  range?: [number, number];
}

export function FunctionPlot({
  fn,
  title,
  domain = [-10, 10],
  range,
}: FunctionPlotProps) {
  const [error, setError] = useState<string | null>(null);

  const evalFn = useMemo(() => {
    try {
      // Create a safe function from the string expression
      const func = new Function("x", `"use strict"; return (${fn});`) as (
        x: number
      ) => number;
      // Test it
      func(0);
      setError(null);
      return func;
    } catch (e) {
      setError(`Invalid function: ${fn}`);
      return (x: number) => x;
    }
  }, [fn]);

  if (error) {
    return (
      <div className="my-6 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
        {error}
      </div>
    );
  }

  return (
    <div className="my-6">
      {title && (
        <p className="mb-2 text-sm font-medium text-muted-foreground">
          {title}
        </p>
      )}
      <div
        className={cn(
          "rounded-lg border border-border overflow-hidden",
          "bg-background"
        )}
      >
        <Mafs
          viewBox={{
            x: domain,
            y: range || [-5, 5],
          }}
          preserveAspectRatio={false}
          height={300}
        >
          <Coordinates.Cartesian />
          <Plot.OfX
            y={evalFn}
            color={Theme.blue}
          />
        </Mafs>
      </div>
    </div>
  );
}

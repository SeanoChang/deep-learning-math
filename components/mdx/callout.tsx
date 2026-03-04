"use client";

import { cn } from "@/lib/utils";
import { Info, AlertTriangle, Lightbulb, BookOpen } from "lucide-react";

type CalloutType = "info" | "warning" | "tip" | "definition" | "theorem";

const config: Record<CalloutType, { icon: React.ElementType; className: string; label: string }> = {
  info: {
    icon: Info,
    className: "border-blue-500/30 bg-blue-500/5 text-blue-600 dark:text-blue-400",
    label: "Info",
  },
  warning: {
    icon: AlertTriangle,
    className: "border-yellow-500/30 bg-yellow-500/5 text-yellow-600 dark:text-yellow-400",
    label: "Warning",
  },
  tip: {
    icon: Lightbulb,
    className: "border-green-500/30 bg-green-500/5 text-green-600 dark:text-green-400",
    label: "Tip",
  },
  definition: {
    icon: BookOpen,
    className: "border-purple-500/30 bg-purple-500/5 text-purple-600 dark:text-purple-400",
    label: "Definition",
  },
  theorem: {
    icon: BookOpen,
    className: "border-indigo-500/30 bg-indigo-500/5 text-indigo-600 dark:text-indigo-400",
    label: "Theorem",
  },
};

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type = "info", title, children }: CalloutProps) {
  const { icon: Icon, className, label } = config[type];

  return (
    <div className={cn("my-6 rounded-lg border-l-4 p-4", className)}>
      <div className="flex items-center gap-2 font-semibold mb-2">
        <Icon className="h-4 w-4" />
        {title || label}
      </div>
      <div className="text-foreground [&>p]:my-1">{children}</div>
    </div>
  );
}

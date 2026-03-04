"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { Play, Loader2, Terminal, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { loadPyodideInstance } from "@/lib/pyodide";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface PythonEditorProps {
  /** Initial Python source to populate the editor with. */
  defaultCode: string;
  /** Optional heading shown in the card title bar. */
  title?: string;
}

type RuntimeStatus = "idle" | "loading" | "ready" | "running" | "error";

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function PythonPlayground({ defaultCode, title }: PythonEditorProps) {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<RuntimeStatus>("idle");
  const [runtimeError, setRuntimeError] = useState<string | null>(null);

  // Track the Pyodide instance so we avoid re-loading on every run
  const pyodideRef = useRef<any>(null);

  // Detect dark mode from the document root class (next-themes)
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    function sync() {
      setIsDark(root.classList.contains("dark"));
    }

    sync();

    const observer = new MutationObserver(sync);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  /* -------------------------------------------------------------- */
  /*  Pyodide initialisation (eager on mount)                        */
  /* -------------------------------------------------------------- */

  useEffect(() => {
    let cancelled = false;

    async function init() {
      setStatus("loading");
      setRuntimeError(null);

      try {
        const instance = await loadPyodideInstance();
        if (!cancelled) {
          pyodideRef.current = instance;
          setStatus("ready");
        }
      } catch (err) {
        if (!cancelled) {
          setRuntimeError(
            err instanceof Error
              ? err.message
              : "Failed to initialise Python runtime."
          );
          setStatus("error");
        }
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  /* -------------------------------------------------------------- */
  /*  Run handler                                                     */
  /* -------------------------------------------------------------- */

  const handleRun = useCallback(async () => {
    const pyodide = pyodideRef.current;
    if (!pyodide) return;

    setStatus("running");
    setOutput("");
    setRuntimeError(null);

    try {
      // Redirect stdout / stderr into a buffer we can read
      pyodide.runPython(`
import sys, io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
`);

      // Execute the user's code
      await pyodide.runPythonAsync(code);

      const stdout: string = pyodide.runPython("sys.stdout.getvalue()");
      const stderr: string = pyodide.runPython("sys.stderr.getvalue()");

      setOutput(
        [stdout, stderr].filter(Boolean).join("\n") || "(no output)"
      );
      setStatus("ready");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unknown error occurred.";
      setOutput(message);
      setStatus("ready");
    }
  }, [code]);

  /* -------------------------------------------------------------- */
  /*  Derived state                                                   */
  /* -------------------------------------------------------------- */

  const isRunnable = status === "ready";
  const isLoading = status === "loading";
  const isRunning = status === "running";

  /* -------------------------------------------------------------- */
  /*  Render                                                          */
  /* -------------------------------------------------------------- */

  return (
    <div
      className={cn(
        "group/editor my-6 rounded-xl border border-border bg-card",
        "shadow-sm transition-shadow duration-200",
        "hover:shadow-md"
      )}
    >
      {/* ---- Title bar ---- */}
      <div
        className={cn(
          "flex items-center justify-between gap-3 px-4 py-2.5",
          "border-b border-border"
        )}
      >
        <div className="flex items-center gap-2 text-sm font-medium text-foreground/80">
          <Terminal className="h-4 w-4 text-muted-foreground" />
          <span>{title ?? "Python Playground"}</span>
        </div>

        <Button
          size="sm"
          variant={isRunnable ? "default" : "secondary"}
          className="gap-1.5 text-xs"
          disabled={!isRunnable}
          onClick={handleRun}
        >
          {isRunning ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Play className="h-3.5 w-3.5" />
          )}
          {isRunning ? "Running..." : "Run"}
        </Button>
      </div>

      {/* ---- Editor ---- */}
      <div className="relative overflow-hidden">
        {/* Loading overlay — shown while Pyodide boots */}
        {isLoading && (
          <div
            className={cn(
              "absolute inset-0 z-10 flex items-center justify-center gap-2",
              "bg-card/80 backdrop-blur-sm text-sm text-muted-foreground"
            )}
          >
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Initialising Python runtime...</span>
          </div>
        )}

        {/* Init error banner */}
        {status === "error" && runtimeError && (
          <div
            className={cn(
              "flex items-start gap-2 px-4 py-3",
              "bg-destructive/10 text-destructive text-sm"
            )}
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{runtimeError}</span>
          </div>
        )}

        <div
          className="min-h-[200px] resize-y overflow-auto"
          style={{ maxHeight: "70vh" }}
        >
          <CodeMirror
            value={code}
            extensions={[python()]}
            onChange={(val) => setCode(val)}
            theme={isDark ? "dark" : "light"}
            basicSetup={{
              lineNumbers: true,
              foldGutter: false,
              highlightActiveLineGutter: true,
              highlightActiveLine: true,
              bracketMatching: true,
              autocompletion: true,
              tabSize: 4,
            }}
            className="text-sm [&_.cm-editor]:!outline-none [&_.cm-focused]:!outline-none"
          />
        </div>
      </div>

      {/* ---- Output panel ---- */}
      {(output || isRunning) && (
        <div className="border-t border-border">
          <div className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-muted-foreground">
            <Terminal className="h-3.5 w-3.5" />
            Output
          </div>
          <pre
            className={cn(
              "px-4 pb-4 pt-0 font-mono text-xs leading-relaxed",
              "max-h-64 overflow-auto whitespace-pre-wrap",
              "text-foreground/90 selection:bg-primary/20"
            )}
          >
            {isRunning ? (
              <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                <Loader2 className="h-3 w-3 animate-spin" />
                Executing...
              </span>
            ) : (
              output
            )}
          </pre>
        </div>
      )}
    </div>
  );
}

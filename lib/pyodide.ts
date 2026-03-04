/**
 * Pyodide WASM Runtime Loader
 *
 * Lazy-loads the Pyodide Python runtime from CDN and caches
 * the singleton instance. Includes numpy by default for
 * numerical computing exercises.
 */

const PYODIDE_CDN_URL =
  "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";

const PYODIDE_INDEX_URL =
  "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/";

let pyodideInstance: unknown = null;
let loadingPromise: Promise<unknown> | null = null;

/**
 * Injects the Pyodide script tag into the document head if it
 * has not already been loaded. Returns a promise that resolves
 * once the global `loadPyodide` function is available.
 */
function ensureScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    // Already loaded — skip injection
    if (typeof (globalThis as Record<string, unknown>).loadPyodide === "function") {
      resolve();
      return;
    }

    const existing = document.querySelector(
      `script[src="${PYODIDE_CDN_URL}"]`
    );
    if (existing) {
      // Script tag exists but may still be loading
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("Failed to load Pyodide script from CDN."))
      );
      return;
    }

    const script = document.createElement("script");
    script.src = PYODIDE_CDN_URL;
    script.async = true;
    script.addEventListener("load", () => resolve());
    script.addEventListener("error", () =>
      reject(new Error("Failed to load Pyodide script from CDN."))
    );
    document.head.appendChild(script);
  });
}

/**
 * Returns a cached Pyodide instance, creating one on the first
 * call. The promise is de-duplicated so concurrent callers share
 * the same loading sequence.
 *
 * After the runtime boots, numpy is pre-loaded so learners can
 * `import numpy as np` immediately.
 */
export async function loadPyodideInstance(): Promise<unknown> {
  // Return cached instance if available
  if (pyodideInstance) return pyodideInstance;

  // De-duplicate concurrent loads
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    try {
      await ensureScript();

      const loader = (globalThis as Record<string, unknown>).loadPyodide;
      if (typeof loader !== "function") {
        throw new Error(
          "Pyodide loader not found on globalThis after script injection."
        );
      }

      const instance = await loader({ indexURL: PYODIDE_INDEX_URL });

      // Pre-load numpy for numerical computing exercises
      await instance.loadPackage("numpy");

      pyodideInstance = instance;
      return instance;
    } catch (error) {
      // Reset so the next call retries rather than returning
      // a permanently rejected promise
      loadingPromise = null;
      throw error;
    }
  })();

  return loadingPromise;
}

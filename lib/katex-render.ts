import katex from "katex";

/**
 * Renders a plain string containing inline `$...$` LaTeX delimiters
 * into an HTML string with KaTeX-rendered math.
 */
export function renderInlineKatex(text: string): string {
  return text.replace(/\$([^$]+)\$/g, (_, tex: string) => {
    try {
      return katex.renderToString(tex, { throwOnError: false });
    } catch {
      return tex;
    }
  });
}

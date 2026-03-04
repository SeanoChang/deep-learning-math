import katex from "katex";

/**
 * Renders a plain string containing inline `$...$` LaTeX delimiters
 * into an HTML string with KaTeX-rendered math.
 */
function toInlineString(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean" || typeof value === "bigint") {
    return String(value);
  }
  if (Array.isArray(value)) {
    return value.map((item) => toInlineString(item)).join("");
  }
  if (value && typeof value === "object") {
    const maybeProps = value as { props?: { children?: unknown } };
    if (maybeProps.props && "children" in maybeProps.props) {
      return toInlineString(maybeProps.props.children);
    }
  }
  return "";
}

export function renderInlineKatex(text: unknown): string {
  const source = toInlineString(text);

  return source.replace(/\$([^$]+)\$/g, (_, tex: string) => {
    try {
      return katex.renderToString(tex, { throwOnError: false });
    } catch {
      return tex;
    }
  });
}

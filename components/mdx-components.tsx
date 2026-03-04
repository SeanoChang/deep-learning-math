import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/mdx/callout";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Callout,
    // Map standard elements to styled versions
    h1: (props) => <h1 id={slugify(props.children)} {...props} />,
    h2: (props) => <h2 id={slugify(props.children)} {...props} />,
    h3: (props) => <h3 id={slugify(props.children)} {...props} />,
  };
}

function slugify(children: React.ReactNode): string {
  if (typeof children === "string") {
    return children.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
  }
  return "";
}

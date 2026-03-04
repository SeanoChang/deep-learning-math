"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const article = document.querySelector("article");
    if (!article) return;

    const elements = article.querySelectorAll("h2, h3");
    const items: TocItem[] = Array.from(elements).map((el) => ({
      id: el.id || el.textContent?.toLowerCase().replace(/\s+/g, "-") || "",
      text: el.textContent || "",
      level: parseInt(el.tagName[1]),
    }));

    // Ensure IDs exist
    elements.forEach((el, i) => {
      if (!el.id) {
        el.id = items[i].id;
      }
    });

    setHeadings(items);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="hidden xl:block sticky top-20 w-56 shrink-0">
      <h4 className="text-sm font-semibold mb-3">On this page</h4>
      <ul className="flex flex-col gap-1 text-sm">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={cn(
                "block py-1 transition-colors hover:text-foreground",
                h.level === 3 && "pl-4",
                activeId === h.id
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

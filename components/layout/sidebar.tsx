"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  TrendingUp,
  Grid3X3,
  BarChart3,
  Target,
  Binary,
  Brain,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ElementType> = {
  TrendingUp,
  Grid3X3,
  BarChart3,
  Target,
  Binary,
  Brain,
};

interface SidebarTopic {
  id: string;
  title: string;
  icon: string;
  color: string;
  lessons: { slug: string; title: string }[];
}

interface SidebarProps {
  topics: SidebarTopic[];
}

export function Sidebar({ topics }: SidebarProps) {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const topic of topics) {
      if (pathname.includes(`/${topic.id}`)) {
        initial[topic.id] = true;
      }
    }
    return initial;
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const sidebarContent = (
    <nav className="flex flex-col gap-1 p-4">
      <Link
        href="/"
        className="flex items-center gap-2 px-3 py-2 mb-4 text-lg font-bold hover:text-primary transition-colors"
      >
        <Brain className="h-5 w-5 text-primary" />
        DL Math
      </Link>

      {topics.map((topic) => {
        const Icon = iconMap[topic.icon] || Brain;
        const isActive = pathname.includes(`/${topic.id}`);
        const isOpen = openSections[topic.id];

        return (
          <div key={topic.id}>
            <button
              onClick={() => toggleSection(topic.id)}
              className={cn(
                "flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                isActive && "bg-accent text-accent-foreground font-medium"
              )}
            >
              <Icon className={cn("h-4 w-4 shrink-0", topic.color)} />
              <span className="flex-1 text-left">{topic.title}</span>
              <ChevronRight
                className={cn("h-3 w-3 transition-transform", isOpen && "rotate-90")}
              />
            </button>

            {isOpen && topic.lessons.length > 0 && (
              <div className="ml-6 mt-1 flex flex-col gap-0.5 border-l border-border pl-3">
                <Link
                  href={`/${topic.id}`}
                  className={cn(
                    "px-2 py-1.5 text-sm rounded-md transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    pathname === `/${topic.id}` && "bg-accent font-medium"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  Overview
                </Link>
                {topic.lessons.map((lesson) => {
                  const lessonPath = `/${topic.id}/${lesson.slug}`;
                  const isLessonActive = pathname === lessonPath;

                  return (
                    <Link
                      key={lesson.slug}
                      href={lessonPath}
                      className={cn(
                        "px-2 py-1.5 text-sm rounded-md transition-colors",
                        "hover:bg-accent hover:text-accent-foreground",
                        isLessonActive && "bg-accent font-medium"
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      {lesson.title}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-3 left-3 z-50 lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-64 bg-sidebar border-r border-sidebar-border overflow-y-auto transition-transform",
          "lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen lg:z-auto lg:shrink-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}

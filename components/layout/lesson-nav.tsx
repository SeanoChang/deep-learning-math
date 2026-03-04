import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface LessonNavProps {
  topicId: string;
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
}

export function LessonNav({ topicId, prev, next }: LessonNavProps) {
  return (
    <div className="flex items-center justify-between mt-12 pt-6 border-t border-border">
      {prev ? (
        <Link
          href={`/${topicId}/${prev.slug}`}
          className="flex items-center gap-2 px-4 py-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          <div className="text-left">
            <div className="text-xs text-muted-foreground">Previous</div>
            <div className="text-sm">{prev.title}</div>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/${topicId}/${next.slug}`}
          className="flex items-center gap-2 px-4 py-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Next</div>
            <div className="text-sm">{next.title}</div>
          </div>
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}

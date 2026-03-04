import Link from "next/link";
import { getTopicLessons, TOPICS } from "@/lib/content";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export default function InformationTheoryPage() {
  const topic = TOPICS["information-theory"];
  const lessons = getTopicLessons("information-theory");

  return (
    <div className="max-w-3xl mx-auto">
      <Breadcrumb items={[{ label: topic.title }]} />

      <h1 className="text-3xl font-bold mb-2">{topic.title}</h1>
      <p className="text-muted-foreground mb-8">{topic.description}</p>

      <div className="flex flex-col gap-3">
        {lessons.map((lesson, i) => (
          <Link key={lesson.slug} href={`/information-theory/${lesson.slug}`}>
            <Card className="hover:shadow-md transition-shadow group cursor-pointer">
              <CardHeader className="flex-row items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="shrink-0">
                    {i + 1}
                  </Badge>
                  <div>
                    <CardTitle className="text-base">{lesson.title}</CardTitle>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardHeader>
            </Card>
          </Link>
        ))}

        {lessons.length === 0 && (
          <p className="text-muted-foreground text-center py-8">
            Lessons coming soon. Check back later!
          </p>
        )}
      </div>
    </div>
  );
}

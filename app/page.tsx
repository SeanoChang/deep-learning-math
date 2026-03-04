import Link from "next/link";
import { getAllTopics } from "@/lib/content";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Grid3X3,
  BarChart3,
  Target,
  Binary,
  Brain,
  ArrowRight,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  TrendingUp,
  Grid3X3,
  BarChart3,
  Target,
  Binary,
  Brain,
};

export default function HomePage() {
  const topics = getAllTopics();

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero */}
      <div className="text-center mb-16 pt-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Brain className="h-4 w-4" />
          Interactive Learning Platform
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          The Math Behind{" "}
          <span className="text-primary">Deep Learning</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Master the rigorous mathematics that powers AI, machine learning, and neural networks.
          Interactive visualizations, exercises, and code playgrounds.
        </p>
      </div>

      {/* Topic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topics.map((topic) => {
          const Icon = iconMap[topic.icon] || Brain;
          return (
            <Link key={topic.id} href={`/${topic.id}`}>
              <Card className="h-full hover:shadow-md transition-shadow group cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-muted ${topic.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg">{topic.title}</CardTitle>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <CardDescription className="mt-2">{topic.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {topic.lessons.length > 0 ? (
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{topic.lessons.length} lessons</Badge>
                    </div>
                  ) : (
                    <Badge variant="outline">Coming soon</Badge>
                  )}
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Prerequisites note */}
      <div className="mt-16 text-center text-sm text-muted-foreground">
        <p>
          Topics are ordered by dependency. Start with Calculus and work your way through.
        </p>
      </div>
    </div>
  );
}

import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { getLessonContent, getAdjacentLessons, getTopicLessons } from "@/lib/content";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { TableOfContents } from "@/components/layout/toc";
import { LessonNav } from "@/components/layout/lesson-nav";
import { Callout } from "@/components/mdx/callout";
import { FunctionPlot } from "@/components/math/function-plot";
import { Problem, Solution } from "@/components/exercise/problem";
import { MultipleChoice } from "@/components/exercise/multiple-choice";
import { NumericInput } from "@/components/exercise/numeric-input";
import { PythonPlayground } from "@/components/playground/python-editor";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const mdxComponents = {
  Callout,
  FunctionPlot,
  Problem,
  Solution,
  MultipleChoice,
  NumericInput,
  PythonPlayground,
};

export async function generateStaticParams() {
  const lessons = getTopicLessons("calculus");
  return lessons.map((l) => ({ slug: l.slug }));
}

export default async function CalculusLessonPage({ params }: PageProps) {
  const { slug } = await params;
  const lesson = getLessonContent("calculus", slug);

  if (!lesson) {
    notFound();
  }

  const { content } = await compileMDX({
    source: lesson.content,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex as never],
      },
    },
  });

  const adjacent = getAdjacentLessons("calculus", slug);

  return (
    <div className="flex gap-10">
      <article className="prose flex-1 min-w-0">
        <Breadcrumb
          items={[
            { label: "Calculus", href: "/calculus" },
            { label: lesson.meta.title },
          ]}
        />
        <h1>{lesson.meta.title}</h1>
        {lesson.meta.description && (
          <p className="text-lg text-muted-foreground -mt-2">{lesson.meta.description}</p>
        )}
        {content}
        <LessonNav topicId="calculus" prev={adjacent.prev} next={adjacent.next} />
      </article>
      <TableOfContents />
    </div>
  );
}

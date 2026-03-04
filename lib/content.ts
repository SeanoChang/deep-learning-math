import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export interface LessonMeta {
  title: string;
  description: string;
  order: number;
  prerequisites?: string[];
}

export interface Lesson {
  slug: string;
  meta: LessonMeta;
  content: string;
}

export interface TopicInfo {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  lessons: { slug: string; title: string; order: number }[];
}

export const TOPICS: Record<string, Omit<TopicInfo, "lessons">> = {
  calculus: {
    id: "calculus",
    title: "Calculus",
    description: "Limits, derivatives, chain rule, gradients, integrals, and multivariable calculus",
    icon: "TrendingUp",
    color: "text-blue-500",
  },
  "linear-algebra": {
    id: "linear-algebra",
    title: "Linear Algebra",
    description: "Vectors, matrices, eigenvalues, SVD, matrix calculus, and projections",
    icon: "Grid3X3",
    color: "text-purple-500",
  },
  probability: {
    id: "probability",
    title: "Probability & Statistics",
    description: "Distributions, Bayes' theorem, expectation, variance, MLE, and MAP",
    icon: "BarChart3",
    color: "text-green-500",
  },
  optimization: {
    id: "optimization",
    title: "Optimization",
    description: "Gradient descent, convexity, Lagrange multipliers, and SGD variants",
    icon: "Target",
    color: "text-orange-500",
  },
  "information-theory": {
    id: "information-theory",
    title: "Information Theory",
    description: "Entropy, KL divergence, and cross-entropy loss",
    icon: "Binary",
    color: "text-cyan-500",
  },
  "deep-learning": {
    id: "deep-learning",
    title: "Deep Learning Foundations",
    description: "Backpropagation, loss landscapes, and universal approximation",
    icon: "Brain",
    color: "text-pink-500",
  },
};

export function getTopicLessons(topicId: string): { slug: string; title: string; order: number }[] {
  const topicDir = path.join(contentDirectory, topicId);

  if (!fs.existsSync(topicDir)) {
    return [];
  }

  const files = fs.readdirSync(topicDir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const filePath = path.join(topicDir, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);
      const slug = filename.replace(/\.mdx$/, "");

      return {
        slug,
        title: (data.title as string) || slug,
        order: (data.order as number) || 0,
      };
    })
    .sort((a, b) => a.order - b.order);
}

export function getLessonContent(topicId: string, slug: string): Lesson | null {
  const filePath = path.join(contentDirectory, topicId, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    meta: {
      title: (data.title as string) || slug,
      description: (data.description as string) || "",
      order: (data.order as number) || 0,
      prerequisites: data.prerequisites as string[] | undefined,
    },
    content,
  };
}

export function getAllTopics(): TopicInfo[] {
  return Object.entries(TOPICS).map(([id, info]) => ({
    ...info,
    id,
    lessons: getTopicLessons(id),
  }));
}

export function getAdjacentLessons(
  topicId: string,
  currentSlug: string
): { prev: { slug: string; title: string } | null; next: { slug: string; title: string } | null } {
  const lessons = getTopicLessons(topicId);
  const currentIndex = lessons.findIndex((l) => l.slug === currentSlug);

  return {
    prev: currentIndex > 0 ? lessons[currentIndex - 1] : null,
    next: currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null,
  };
}

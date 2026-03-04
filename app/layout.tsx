import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Sidebar } from "@/components/layout/sidebar";
import { getAllTopics } from "@/lib/content";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Deep Learning Math",
  description:
    "Interactive learning platform for the rigorous mathematics behind AI, ML, and deep learning",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const topics = getAllTopics();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="flex min-h-screen">
            <Sidebar
              topics={topics.map((t) => ({
                id: t.id,
                title: t.title,
                icon: t.icon,
                color: t.color,
                lessons: t.lessons,
              }))}
            />
            <div className="flex-1 flex flex-col min-w-0">
              <header className="sticky top-0 z-30 flex items-center justify-end h-14 px-6 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <ThemeToggle />
              </header>
              <main className="flex-1 px-6 py-8 lg:px-10">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

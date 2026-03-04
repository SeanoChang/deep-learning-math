# Deep Learning Math

Interactive course covering the mathematical foundations of deep learning — built with Next.js, MDX, and in-browser Python execution.

## Topics

- **Calculus** — Limits, derivatives, chain rule, gradients, integrals, and multivariable calculus
- **Linear Algebra** — Vectors, matrices, eigenvalues, SVD, matrix calculus, and projections
- **Probability & Statistics** — Distributions, Bayes' theorem, expectation, variance, MLE, and MAP
- **Optimization** — Gradient descent, convexity, Lagrange multipliers, and SGD variants
- **Information Theory** — Entropy, KL divergence, and cross-entropy loss
- **Deep Learning Foundations** — Backpropagation, loss landscapes, and universal approximation

## Tech Stack

- **Framework**: Next.js 15 (App Router, Turbopack)
- **Content**: MDX via `next-mdx-remote/rsc` with KaTeX math rendering
- **Visualizations**: [Mafs](https://mafs.dev) for interactive 2D math plots
- **Code**: CodeMirror 6 editor + [Pyodide](https://pyodide.org) (Python in WebAssembly)
- **Styling**: Tailwind CSS v4 + shadcn/ui patterns
- **Animations**: Framer Motion

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/                  # Next.js app router pages
components/
  math/               # FunctionPlot, GradientDescent (Mafs-based)
  exercise/           # Problem, MultipleChoice, NumericInput
  playground/         # PythonPlayground (CodeMirror + Pyodide)
  layout/             # Sidebar, ThemeToggle, Breadcrumb, ToC, LessonNav
content/
  calculus/           # MDX lesson files (01-limits, 02-derivatives, ...)
lib/
  content.ts          # Content loading utilities, topic definitions
  pyodide.ts          # Pyodide WASM loader
```

## Adding Content

Create an `.mdx` file in the appropriate `content/{topic}/` directory with frontmatter:

```mdx
---
title: "Lesson Title"
description: "Short description"
order: 3
prerequisites: ["02-previous-lesson"]
---

Your content with $\LaTeX$ math and interactive components.
```

import { createFileRoute } from "@tanstack/react-router";
import { Search, Filter, Hammer } from "lucide-react";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — ProblemForge" },
      {
        name: "description",
        content: "Three steps: search the catalog, narrow with filters, and start building.",
      },
      { property: "og:title", content: "How It Works — ProblemForge" },
      {
        property: "og:description",
        content: "Search, filter, and forge — how ProblemForge helps you pick a problem.",
      },
    ],
  }),
  component: HowItWorks,
});

const STEPS = [
  {
    icon: Search,
    title: "Search",
    body: "Describe what you're curious about in plain language — a domain, a stack, a timeframe.",
  },
  {
    icon: Filter,
    title: "Filter",
    body: "Narrow by domain, difficulty, tech stack, and duration until the shortlist fits you.",
  },
  {
    icon: Hammer,
    title: "Forge",
    body: "Open a problem for full background, users, constraints, resources, and outcomes.",
  },
];

function HowItWorks() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold text-foreground">
        How <span className="gradient-text">ProblemForge</span> works
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        A short path from vague curiosity to a problem statement you can actually start on.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {STEPS.map((s, i) => (
          <div key={s.title} className="glass card-hover rounded-2xl p-6">
            <s.icon className="size-6 text-primary" />
            <p className="mt-4 text-xs text-accent">STEP {i + 1}</p>
            <h2 className="mt-1 font-display text-xl font-semibold text-foreground">{s.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

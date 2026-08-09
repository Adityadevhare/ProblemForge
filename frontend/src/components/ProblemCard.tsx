import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Gauge } from "lucide-react";
import type { Problem } from "@/lib/api";

export function ProblemCard({ problem }: { problem: Problem }) {
  const tags = (problem.tags ?? problem.tech_stack ?? []).slice(0, 4);
  const summary = problem.summary ?? problem.description ?? "";

  return (
    <article className="glass card-hover flex flex-col rounded-2xl p-6">
      {problem.domain ? (
        <span className="w-fit rounded-full border border-primary/40 bg-primary/15 px-3 py-1 text-xs font-medium text-foreground">
          {problem.domain}
        </span>
      ) : null}

      <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-foreground">
        {problem.title}
      </h3>

      {summary ? (
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{summary}</p>
      ) : null}

      {tags.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-md border border-accent/30 bg-accent/10 px-2 py-1 text-xs text-accent"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        {problem.difficulty ? (
          <span className="inline-flex items-center gap-1.5">
            <Gauge className="size-3.5" />
            {problem.difficulty}
          </span>
        ) : null}
        {problem.duration ? (
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" />
            {problem.duration}
          </span>
        ) : null}
      </div>

      <Link
        to="/problems/$id"
        params={{ id: String(problem.id) }}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent"
      >
        View Problem <ArrowRight className="size-4" />
      </Link>
    </article>
  );
}

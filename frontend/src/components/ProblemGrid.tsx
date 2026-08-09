import { Skeleton } from "@/components/ui/skeleton";
import { ProblemCard } from "@/components/ProblemCard";
import type { Problem } from "@/lib/api";
import { SearchX } from "lucide-react";

export function ProblemGrid({
  problems,
  loading,
  error,
}: {
  problems: Problem[];
  loading?: boolean;
  error?: boolean;
}) {
  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="glass rounded-2xl p-6">
            <Skeleton className="h-5 w-24 rounded-full bg-surface-strong" />
            <Skeleton className="mt-4 h-6 w-3/4 bg-surface-strong" />
            <Skeleton className="mt-3 h-4 w-full bg-surface-strong" />
            <Skeleton className="mt-2 h-4 w-5/6 bg-surface-strong" />
            <div className="mt-5 flex gap-2">
              <Skeleton className="h-6 w-16 bg-surface-strong" />
              <Skeleton className="h-6 w-16 bg-surface-strong" />
            </div>
            <Skeleton className="mt-6 h-5 w-32 bg-surface-strong" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass rounded-2xl p-12 text-center">
        <h3 className="font-display text-xl text-foreground">Couldn't reach the API</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Make sure the ProblemForge API is running at http://localhost:8000/api
        </p>
      </div>
    );
  }

  if (!problems.length) {
    return (
      <div className="glass rounded-2xl p-12 text-center">
        <SearchX className="mx-auto size-8 text-muted-foreground" />
        <h3 className="mt-4 font-display text-xl text-foreground">No results found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Try a different search or clear your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {problems.map((p) => (
        <ProblemCard key={String(p.id)} problem={p} />
      ))}
    </div>
  );
}

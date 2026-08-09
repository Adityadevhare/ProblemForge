import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { FilterBar } from "@/components/FilterBar";
import { ProblemGrid } from "@/components/ProblemGrid";
import { searchProblems } from "@/lib/api";
import { useFilterStore } from "@/store/filters";

type SearchParams = { q: string };

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    q: typeof search["q"] === "string" ? search["q"] : "",
  }),
  head: () => ({
    meta: [
      { title: "Search Problems — ProblemForge" },
      {
        name: "description",
        content: "Search problem statements by keyword, domain, difficulty, tech stack, duration.",
      },
      { property: "og:title", content: "Search Problems — ProblemForge" },
      {
        property: "og:description",
        content: "Search curated problem statements and filter them to your constraints.",
      },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const filters = useFilterStore((s) => s.filters);

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["search", q, filters],
    queryFn: () => searchProblems(q, { ...filters, limit: 24 }),
    retry: 0,
  });

  useEffect(() => {
    if (isError) toast.error("Search failed. Is the API running?");
  }, [isError]);

  const results = data ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold text-foreground">
        Results for <span className="gradient-text">“{q}”</span>
      </h1>
      <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
        {isLoading || isFetching ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Searching…
          </>
        ) : (
          `${results.length} problem${results.length === 1 ? "" : "s"} found`
        )}
      </p>

      <div className="mt-8">
        <FilterBar />
      </div>

      <div className="mt-8">
        <ProblemGrid problems={results} loading={isLoading} error={isError} />
      </div>
    </div>
  );
}

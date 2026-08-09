import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { Hero } from "@/components/Hero";
import { FilterBar } from "@/components/FilterBar";
import { ProblemGrid } from "@/components/ProblemGrid";
import { getProblems } from "@/lib/api";
import { useFilterStore } from "@/store/filters";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ProblemForge — Find a problem worth solving" },
      {
        name: "description",
        content:
          "Discover meaningful problem statements filtered by domain, difficulty, tech stack, and duration.",
      },
      { property: "og:title", content: "ProblemForge — Find a problem worth solving" },
      {
        property: "og:description",
        content: "Explore curated problem statements tailored to your skills and constraints.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const filters = useFilterStore((s) => s.filters);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["problems", filters],
    queryFn: () => getProblems({ ...filters, limit: 24 }),
    retry: 0,
  });

  useEffect(() => {
    if (isError) toast.error("Failed to load problems from the API.");
  }, [isError]);

  return (
    <div>
      <Hero />
      <section className="mx-auto max-w-7xl px-4 pb-24">
        <FilterBar />
        <h2 className="mt-10 font-display text-2xl font-semibold text-foreground">
          Browse problems
        </h2>
        <div className="mt-6">
          <ProblemGrid problems={data ?? []} loading={isLoading} error={isError} />
        </div>
      </section>
    </div>
  );
}

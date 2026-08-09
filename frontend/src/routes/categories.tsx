import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getMetadata } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — ProblemForge" },
      {
        name: "description",
        content: "Browse problem domains, difficulty levels, technologies, and durations.",
      },
      { property: "og:title", content: "Categories — ProblemForge" },
      {
        property: "og:description",
        content: "Browse every domain, difficulty, technology, and duration in ProblemForge.",
      },
    ],
  }),
  component: Categories,
});

function Group({
  title,
  items,
  onPick,
}: {
  title: string;
  items: string[];
  onPick: (v: string) => void;
}) {
  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="font-display text-lg font-semibold text-foreground">{title}</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.length ? (
          items.map((item) => (
            <button
              key={item}
              onClick={() => onPick(item)}
              className="rounded-full border border-primary/40 bg-primary/15 px-3 py-1.5 text-xs text-foreground transition-colors hover:border-accent/60 hover:text-accent"
            >
              {item}
            </button>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">Nothing here yet.</p>
        )}
      </div>
    </div>
  );
}

function Categories() {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({ queryKey: ["metadata"], queryFn: getMetadata, retry: 0 });

  const pick = (v: string) => navigate({ to: "/search", search: { q: v } });

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold text-foreground">
        Browse by <span className="gradient-text">category</span>
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Every domain, difficulty, technology, and duration available in the catalog.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-40 rounded-2xl bg-surface-strong" />
            ))
          : (
              [
                { title: "Domains", items: data?.domains ?? [] },
                { title: "Difficulty Levels", items: data?.difficulties ?? [] },
                { title: "Technologies", items: data?.techs ?? [] },
                { title: "Durations", items: data?.durations ?? [] },
              ] as const
            ).map((g) => <Group key={g.title} title={g.title} items={g.items} onPick={pick} />)}
      </div>
    </div>
  );
}

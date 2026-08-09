import { useQuery } from "@tanstack/react-query";
import { getMetadata, type Filters } from "@/lib/api";
import { useFilterStore } from "@/store/filters";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type Key = "domain" | "difficulty" | "tech" | "duration";

const LABELS: Record<Key, string> = {
  domain: "Domain",
  difficulty: "Difficulty",
  tech: "Tech Stack",
  duration: "Duration",
};

export function FilterBar() {
  const { filters, setFilter, clearFilters } = useFilterStore();
  const { data } = useQuery({
    queryKey: ["metadata"],
    queryFn: getMetadata,
    retry: 0,
  });

  const options: Record<Key, string[]> = {
    domain: data?.domains ?? [],
    difficulty: data?.difficulties ?? [],
    tech: data?.techs ?? [],
    duration: data?.durations ?? [],
  };

  const active = (Object.keys(LABELS) as Key[]).filter((k) => filters[k]);

  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        {(Object.keys(LABELS) as Key[]).map((key) => (
          <Select
            key={key}
            value={(filters[key] as string) ?? ""}
            onValueChange={(v) => setFilter(key, v)}
          >
            <SelectTrigger className="w-full border-border bg-surface text-foreground sm:w-44">
              <SelectValue placeholder={LABELS[key]} />
            </SelectTrigger>
            <SelectContent>
              {options[key].length === 0 ? (
                <SelectItem value="__none" disabled>
                  No options
                </SelectItem>
              ) : (
                options[key].map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        ))}

        <Button variant="ghost" size="sm" className="sm:ml-auto" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>

      {active.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {active.map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key, undefined)}
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/15 px-3 py-1 text-xs text-foreground transition-colors hover:border-accent/60 hover:text-accent"
            >
              {LABELS[key]}: {filters[key] as string}
              <X className="size-3" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function useActiveFilters(): Filters {
  return useFilterStore((s) => s.filters);
}

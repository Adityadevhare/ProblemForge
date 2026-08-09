import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Search, Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMetadata } from "@/lib/api";
import { useSurpriseMe } from "@/hooks/useSurpriseMe";

const PLACEHOLDERS = [
  "Search 'AI problems for healthcare'",
  "Search 'beginner Python projects'",
  "Search 'weekend hackathon ideas'",
];

const CHIPS = ["AI + Healthcare", "Python + Beginner", "Weekend Hackathon"];

export function Hero() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [phIndex, setPhIndex] = useState(0);
  const { surprise, loading } = useSurpriseMe();

  useEffect(() => {
    const t = setInterval(() => setPhIndex((i) => (i + 1) % PLACEHOLDERS.length), 3000);
    return () => clearInterval(t);
  }, []);

  const { data: meta } = useQuery({ queryKey: ["metadata"], queryFn: getMetadata, retry: 0 });

  const go = (q: string) => {
    const query = q.trim();
    if (!query) return;
    navigate({ to: "/search", search: { q: query } });
  };

  const stats = [
    { label: "Problems", value: meta?.total_problems ? `${meta.total_problems}+` : "—" },
    { label: "Domains", value: meta?.domains?.length ?? "—" },
    { label: "Difficulty Levels", value: meta?.difficulties?.length ?? "—" },
    { label: "Technologies", value: meta?.techs?.length ?? "—" },
  ];

  return (
    <section className="mx-auto max-w-5xl px-4 pb-16 pt-16 text-center sm:pt-24">
      <p className="text-xs font-medium tracking-[0.28em] text-accent">
        PROBLEM DISCOVERY PLATFORM
      </p>
      <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.1] text-foreground sm:text-6xl">
        Find a problem <span className="gradient-text">worth solving.</span>
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
        Explore meaningful problem statements tailored to your skills, interests, and constraints.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          go(value);
        }}
        className="glass group mx-auto mt-10 flex items-center gap-2 rounded-2xl p-2 transition-all focus-within:border-accent/60 focus-within:shadow-[var(--shadow-glow-accent)] sm:p-3"
      >
        <Search className="ml-2 size-5 shrink-0 text-muted-foreground" />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={PLACEHOLDERS[phIndex]}
          aria-label="Search problems"
          className="min-w-0 flex-1 bg-transparent py-3 text-base text-foreground outline-none placeholder:text-muted-foreground"
        />
        <Button type="submit" variant="hero" size="lg" className="shrink-0">
          Search
        </Button>
      </form>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        {CHIPS.map((chip) => (
          <button
            key={chip}
            onClick={() => go(chip)}
            className="glass rounded-full px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
          >
            {chip}
          </button>
        ))}
      </div>

      <div className="mt-8">
        <Button variant="glass" size="lg" disabled={loading} onClick={surprise}>
          <Hammer className="size-4" /> Surprise Me
        </Button>
      </div>

      <dl className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="glass rounded-2xl px-4 py-5">
            <dt className="order-2 mt-1 text-xs text-muted-foreground">{s.label}</dt>
            <dd className="font-display text-2xl font-bold text-foreground">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

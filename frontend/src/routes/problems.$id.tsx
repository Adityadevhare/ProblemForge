import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { ArrowLeft, Clock, Gauge, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getProblem, type Problem } from "@/lib/api";

export const Route = createFileRoute("/problems/$id")({
  head: () => ({
    meta: [
      { title: "Problem Detail — ProblemForge" },
      {
        name: "description",
        content: "Full problem background, target users, constraints, resources, and outcomes.",
      },
      { property: "og:title", content: "Problem Detail — ProblemForge" },
      {
        property: "og:description",
        content: "Full problem background, target users, constraints, resources, and outcomes.",
      },
    ],
  }),
  component: ProblemDetail,
});

function Section({ title, items }: { title: string; items: string[] | undefined }) {
  if (!items?.length) return null;
  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="font-display text-lg font-semibold text-foreground">{title}</h2>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm text-muted-foreground">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Pill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs text-muted-foreground">
      {icon}
      {text}
    </span>
  );
}

function ProblemDetail() {
  const { id } = Route.useParams();
  const { data, isLoading, isError } = useQuery<Problem>({
    queryKey: ["problem", id],
    queryFn: () => getProblem(id),
    retry: 0,
  });

  useEffect(() => {
    if (isError) toast.error("Failed to load this problem.");
  }, [isError]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
      >
        <ArrowLeft className="size-4" /> Back
      </Link>

      {isLoading ? (
        <div className="mt-8 space-y-4">
          <Skeleton className="h-6 w-28 bg-surface-strong" />
          <Skeleton className="h-10 w-3/4 bg-surface-strong" />
          <Skeleton className="h-40 w-full bg-surface-strong" />
        </div>
      ) : isError || !data ? (
        <div className="glass mt-8 rounded-2xl p-12 text-center">
          <h1 className="font-display text-xl text-foreground">Problem unavailable</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            We couldn't load this problem. Check that the API is running.
          </p>
        </div>
      ) : (
        <>
          {data.domain ? (
            <span className="mt-8 inline-block rounded-full border border-primary/40 bg-primary/15 px-3 py-1 text-xs text-foreground">
              {data.domain}
            </span>
          ) : null}
          <h1 className="mt-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
            {data.title}
          </h1>

          <div className="mt-5 flex flex-wrap gap-2">
            {data.difficulty ? (
              <Pill icon={<Gauge className="size-3.5" />} text={data.difficulty} />
            ) : null}
            {data.duration ? (
              <Pill icon={<Clock className="size-3.5" />} text={data.duration} />
            ) : null}
            {(data.tech_stack ?? []).map((t) => (
              <Pill key={t} icon={<Cpu className="size-3.5" />} text={t} />
            ))}
          </div>

          <div className="mt-8 space-y-5">
            {data.background || data.description || data.summary ? (
              <div className="glass rounded-2xl p-6">
                <h2 className="font-display text-lg font-semibold text-foreground">
                  Problem Background
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {data.background ?? data.description ?? data.summary}
                </p>
              </div>
            ) : null}
            <Section title="Target Users" items={data.target_users} />
            <Section title="Constraints" items={data.constraints} />
            <Section title="Resources Provided" items={data.resources_provided} />
            <Section title="Desired Outcomes" items={data.desired_outcomes} />
          </div>

          <div className="mt-10">
            <Button variant="hero" size="lg" className="w-full sm:w-auto">
              Solve This Problem
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

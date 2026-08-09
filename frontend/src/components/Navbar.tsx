import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSurpriseMe } from "@/hooks/useSurpriseMe";

const links = [
  { to: "/", label: "Problems" },
  { to: "/categories", label: "Categories" },
  { to: "/how-it-works", label: "How It Works" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { surprise, loading } = useSurpriseMe();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <nav className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 md:flex md:justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <Hammer className="size-5 shrink-0 text-primary" />
          <span className="gradient-text truncate font-display text-lg font-bold">ProblemForge</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-muted-foreground transition-colors hover:text-accent"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Button variant="hero" size="sm" disabled={loading} onClick={surprise}>
            Surprise Me
          </Button>
        </div>

        <button
          className="justify-self-end rounded-md p-2 text-muted-foreground md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-border px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-sm text-muted-foreground hover:text-accent"
              >
                {l.label}
              </Link>
            ))}
            <Button variant="hero" size="sm" disabled={loading} onClick={surprise}>
              Surprise Me
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}

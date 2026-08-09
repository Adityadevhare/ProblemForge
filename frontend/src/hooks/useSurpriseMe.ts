import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { getRandomProblem } from "@/lib/api";

export function useSurpriseMe() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const surprise = async () => {
    setLoading(true);
    try {
      const problem = await getRandomProblem();
      if (!problem?.id && problem?.id !== 0) throw new Error("No problem returned");
      navigate({ to: "/problems/$id", params: { id: String(problem.id) } });
    } catch {
      toast.error("Couldn't fetch a random problem. Is the API running?");
    } finally {
      setLoading(false);
    }
  };

  return { surprise, loading };
}

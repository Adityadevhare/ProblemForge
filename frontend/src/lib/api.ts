import axios from "axios";

export const API_BASE_URL = "http://localhost:8000/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

export type Problem = {
  id: string | number;
  title: string;
  summary?: string;
  description?: string;
  domain?: string;
  difficulty?: string;
  duration?: string;
  tech_stack?: string[];
  tags?: string[];
  background?: string;
  target_users?: string[];
  constraints?: string[];
  resources_provided?: string[];
  desired_outcomes?: string[];
};

export type Metadata = {
  total_problems?: number;
  domains?: string[];
  difficulties?: string[];
  techs?: string[];
  durations?: string[];
};

export type Filters = {
  domain?: string;
  difficulty?: string;
  tech?: string;
  duration?: string;
  limit?: number;
  offset?: number;
};

function unwrapList(data: unknown): Problem[] {
  if (Array.isArray(data)) return data as Problem[];

  const obj = data as Record<string, unknown> | null;

  if (obj && Array.isArray(obj["items"])) {
    return obj["items"] as Problem[];
  }

  if (obj && Array.isArray(obj["problems"])) {
    return obj["problems"] as Problem[];
  }

  if (obj && Array.isArray(obj["results"])) {
    return obj["results"] as Problem[];
  }

  if (obj && Array.isArray(obj["data"])) {
    return obj["data"] as Problem[];
  }

  return [];
}

function cleanParams(filters: Filters & { q?: string }) {
  return Object.fromEntries(
    Object.entries(filters).filter(([, v]) => v !== undefined && v !== "" && v !== null),
  );
}

export async function getProblems(filters: Filters = {}) {
  const { data } = await apiClient.get("/problems", { params: cleanParams(filters) });
  return unwrapList(data);
}

export async function getProblem(id: string): Promise<Problem> {
  const { data } = await apiClient.get(`/problems/${id}`);

  const obj = data as Record<string, unknown>;

  if (obj && typeof obj === "object" && "problem" in obj) {
    return obj["problem"] as Problem;
  }

  return data as Problem;
}

export async function searchProblems(q: string, filters: Filters = {}) {
  const { data } = await apiClient.get("/search", {
    params: cleanParams({ q, ...filters }),
  });

  return unwrapList(data);
}

export async function getRandomProblem(): Promise<Problem> {
  const { data } = await apiClient.get("/random");

  const obj = data as Record<string, unknown>;

  if (obj && typeof obj === "object" && "problem" in obj) {
    return obj["problem"] as Problem;
  }

  return data as Problem;
}

export async function getMetadata(): Promise<Metadata> {
  const { data } = await apiClient.get("/metadata");
  return data as Metadata;
}

import { create } from "zustand";
import type { Filters } from "@/lib/api";

type FilterKey = "domain" | "difficulty" | "tech" | "duration";

type FilterState = {
  filters: Filters;
  setFilter: (key: FilterKey, value: string | undefined) => void;
  clearFilters: () => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  filters: {},
  setFilter: (key, value) =>
    set((state) => {
      const next = { ...state.filters };
      if (!value) delete next[key];
      else next[key] = value;
      return { filters: next };
    }),
  clearFilters: () => set({ filters: {} }),
}));

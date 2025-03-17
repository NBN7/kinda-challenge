import type { TMovie } from "@/types/movie";
import type { TFilter } from "@/types/filters";

export const getUniqueFilters = (data: TMovie[], keys: Readonly<TFilter[]>) => {
  return keys.reduce((acc, key) => {
    acc[key] = Array.from(
      new Set(data.map((item) => item[key] as string).filter(Boolean))
    );
    return acc;
  }, {} as Record<TFilter, string[]>);
};

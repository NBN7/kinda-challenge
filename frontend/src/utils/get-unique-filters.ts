import type { TMovieFilters } from "@/types/movie";

export const getUniqueFilters = (
  data: TMovieFilters[],
  keys: (keyof TMovieFilters)[]
) => {
  return keys.reduce((acc, key) => {
    acc[key] = Array.from(
      new Set(data.map((item) => item[key] as string).filter(Boolean))
    );
    return acc;
  }, {} as Record<keyof TMovieFilters, string[]>);
};

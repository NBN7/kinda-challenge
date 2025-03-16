import { useQuery } from "@tanstack/react-query";
import { getMovies } from "@/services/get-movies";
import type { TMovieFilters } from "@/types/movie";

export const useGetMovies = (filters?: TMovieFilters) => {
  const validFilters = Object.fromEntries(
    Object.entries(filters || {}).filter(
      ([_, value]) => value && value.trim() !== "" // eslint-disable-line @typescript-eslint/no-unused-vars
    )
  );

  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ["movies", validFilters], // se ejecuta denuevo si cambian los filtros
    queryFn: () => getMovies(validFilters),
  });

  return { isLoading, isError, data, refetch };
};

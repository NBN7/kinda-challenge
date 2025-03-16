import { useQuery } from "@tanstack/react-query";
import { getMovies } from "@/services/get-movies";
import type { TMovieFilters } from "@/types/movie";

export const useGetMovies = (filters?: TMovieFilters) => {

  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ["movies"],
    queryFn: () => getMovies(filters),
  });

  return { isLoading, isError, data, refetch };
};

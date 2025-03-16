import type { TMovie } from "@/types/movie";

export const getMovies = async (
  params: { [key: string]: string } = {}
): Promise<TMovie[]> => {
  const queryParams = new URLSearchParams(params).toString();
  const url = queryParams ? `/api/movies?${queryParams}` : `/api/movies`;

  const res = await fetch(url);
  const data = await res.json();

  return data;
};

import { FETCH_STATUS } from "@/constants/fetch-status";
import type { TGetMoviesResponse } from "@/types/movie";

export const getMovies = async (params: {
  [key: string]: string;
}): Promise<TGetMoviesResponse> => {
  try {
    const queryParams = new URLSearchParams(params).toString();
    const url = `/api/movies?${queryParams}`;

    const res = await fetch(url);
    const result = await res.json();

    if (!res.ok) {
      return {
        status: FETCH_STATUS.ERROR,
        data: null,
        error: result.error || "Ocurrió un error inesperado.",
      };
    }

    return { status: FETCH_STATUS.SUCCESS, data: result, error: null };
  } catch (error) {
    console.error("Error obteniendo películas:", error);
    return {
      status: FETCH_STATUS.ERROR,
      data: null,
      error: "No se pudo conectar con el servidor. Intentalo más tarde.",
    };
  }
};

"use client";

import { useState, useCallback, useMemo } from "react";
import { useGetMovies } from "@/hooks/use-get-movies";
import { getUniqueFilters } from "@/utils/get-unique-filters";
import { formatKey } from "@/utils/format-key";
import { MapComponent } from "@/components/map/map-component";
import { HomeSkeleton } from "@/components/home-skeleton";
import { MovieFilter } from "@/components/movie-filter";
import type { TMovieFilters, TMovie } from "@/types/movie";

function App() {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string | null>>({});
  const { isLoading, isError, data } = useGetMovies();

  const filters = useMemo(() => {
    return getUniqueFilters(data || [], [
      "title",
      "productionCompany",
      "distributor",
      "director",
      "writer",
      "releaseYear",
      "analysisNeighborhood",
    ]);
  }, [data]);

  const handleFilterChange = useCallback(
    (filterKey: string, value: string | null) => {
      setSelectedFilters((prev) => ({
        ...prev,
        [filterKey]: value,
      }));
    },
    [setSelectedFilters]
  );

  const filteredMovies = useMemo(() => {
    return (data || []).filter((movie: TMovie) =>
      // convierto el objeto en un array, por ejemplo, ["title", "The Matrix"]
      Object.entries(selectedFilters).every(([key, value]) => {
        if (!value) return true;
        return movie[key as keyof TMovie] === value;
      })
    );
  }, [data, selectedFilters]);

  if (isLoading) return <HomeSkeleton filterQuantity={Object.keys(filters).length} />;
  if (isError) return <p>Error al cargar las ubicaciones.</p>;

  return (
    <main>
      <div className="flex flex-wrap gap-2">
        {Object.keys(filters).map((f) => {
          const formattedFilter = formatKey(f);
          const values = filters[f as keyof TMovieFilters];

          return (
            <MovieFilter
              key={f}
              filterKey={f}
              formattedLabel={formattedFilter}
              options={values}
              value={selectedFilters[f] || null}
              onChange={(value) => handleFilterChange(f, value)}
            />
          );
        })}
      </div>

      <section className="mt-4">
        <MapComponent movies={filteredMovies} />
      </section>
    </main>
  );
}

export default App;

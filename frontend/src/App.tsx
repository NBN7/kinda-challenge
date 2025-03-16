"use client";

import { useState } from "react";
import { useGetMovies } from "@/hooks/use-get-movies";
import { getUniqueFilters } from "@/utils/get-unique-filters";
import { formatKey } from "@/utils/format-key";
import { MapComponent } from "@/components/map/map-component";
import { HomeSkeleton } from "@/components/home-skeleton";
import { MovieFilters } from "@/components/movie-filters";
import type { TMovieFilters } from "@/types/movie";

function App() {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string | null>>({});
  const { isLoading, isError, data } = useGetMovies();

  const filters = getUniqueFilters(data || [], [
    "title",
    "productionCompany",
    "distributor",
    "director",
    "writer",
    "releaseYear",
    "analysisNeighborhood",
  ]);
  const filtersLength = Object.keys(filters).length;

  const handleFilterChange = (filterKey: string, value: string | null) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterKey]: value,
    }));
  };

  if (isLoading) return <HomeSkeleton filterQuantity={filtersLength} />;
  if (isError) return <p>Error al cargar las ubicaciones.</p>;

  return (
    <main>
      <div className="flex flex-wrap gap-2">
        {Object.keys(filters).map((f) => {
          const formatedFilter = formatKey(f);
          const values = filters[f as keyof TMovieFilters];

          return (
            <MovieFilters
              key={f}
              filterKey={f}
              formattedLabel={formatedFilter}
              options={values}
              value={selectedFilters[f] || null}
              onChange={(value) => handleFilterChange(f, value)}
            />
          );
        })}
      </div>

      <section className="mt-4">
        <MapComponent movies={data || []} />
      </section>
    </main>
  );
}

export default App;

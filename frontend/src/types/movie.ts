export type TMovie = {
  title: string;
  releaseYear: string;
  locations: string;
  funFacts: string;
  productionCompany: string;
  distributor: string;
  director: string;
  writer: string;
  actor1: string;
  actor2: string;
  actor3: string;
  point: string;
  longitude: string;
  latitude: string;
  analysisNeighborhood: string;
  supervisorDistrict: string;
  dataAsOf: string;
  dataLoadedAt: string;
  sfFindNeighborhoods: string;
  analysisNeighborhoods: string;
  currentSupervisorDistricts: string;
};

export type TGetMoviesResponse = {
  status: string;
  data: TMovie[] | null;
  error: string | null;
};

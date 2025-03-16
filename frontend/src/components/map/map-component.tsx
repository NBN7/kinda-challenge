import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { TMovie } from "@/types/movie";

interface MapComponentProps {
  movies: TMovie[] | [];
}

export const MapComponent = ({ movies }: MapComponentProps) => {
  const center = [37.7749, -122.4194]; // San Francisco

  return (
    <MapContainer
      // @ts-expect-error no toma la prop center pero funciona y es necesaria
      center={center}
      zoom={12}
      className="w-full z-10 h-[600px] sm:h-[800px]"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {movies
        .filter((movie) => movie.latitude && movie.longitude)
        .map((movie, index) => {
          const lat = parseFloat(movie.latitude);
          const lon = parseFloat(movie.longitude);

          if (isNaN(lat) || isNaN(lon)) return null; // no agrego marcadores sin coordenadas

          return (
            <Marker key={index} position={[lat, lon]}>
              <Popup>
                <strong>{movie.title}</strong> ({movie.releaseYear}) <br />
                <em>{movie.locations}</em> <br />
                Dirigida por: {movie.director}
              </Popup>
            </Marker>
          );
        })}
    </MapContainer>
  );
};

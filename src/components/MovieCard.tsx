import { Link } from "react-router-dom";
import { Movie } from "../types";

const MovieCard = ({ movie }: { movie: Movie }) => (
  <Link
    to={`/movie/${movie.imdbID}`}
    className="p-4 border-2 rounded shadow hover:bg-gray-400"
    aria-label={`View details for ${movie.Title}`}
  >
    <img
      src={movie.Poster}
      alt={movie.Title}
      className="w-full h-48 object-cover"
    />
    <h2 className="mt-2 font-bold">{movie.Title}</h2>
  </Link>
);

export default MovieCard;

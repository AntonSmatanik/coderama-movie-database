import MovieCard from "../components/MovieCard";
import { useFavorites } from "../context/FavoritesContext";

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  const renderFavorites = () => {
    if (favorites?.length === 0) {
      return <div className="text-center">No favorites yet!</div>;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites?.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    );
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl mb-4">My Favorite Movies</h1>
      {renderFavorites()}
    </div>
  );
};

export default FavoritesPage;

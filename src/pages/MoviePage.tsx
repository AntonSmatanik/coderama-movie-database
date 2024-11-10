import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import StarButton from "../components/StarButton";
import { useFavorites } from "../context/FavoritesContext";
import { useMovieDetail } from "../hooks/useMovieDetail";

type MovieParams = {
  id: string;
};

const MoviePage = () => {
  const { id } = useParams<MovieParams>();
  const { data, isFetching, isError, error } = useMovieDetail(id!);
  const { dispatch, favorites } = useFavorites();

  if (isError) {
    return (
      <div className="p-5 text-center text-red-600 text-xl md:text-2xl">
        {(error as { message: string })?.message}
      </div>
    );
  }

  if (isFetching) {
    return <Loader />;
  }

  if (data?.Response === "False") {
    return (
      <div className="p-5 text-center text-red-600 text-xl md:text-2xl">
        {data?.Error}
      </div>
    );
  }

  const renderButton = () => {
    if (!data) {
      return <></>;
    }

    const favorited = favorites?.some((movie) => movie.Title === data.Title);

    const onClick = favorited
      ? () => dispatch({ type: "REMOVE_FAVORITE", Title: data.Title })
      : () => dispatch({ type: "ADD_FAVORITE", movie: data });

    return <StarButton onClick={onClick} favorited={favorited} />;
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl md:text-3xl text-center mb-5">{data?.Title}</h1>
      <div className="flex flex-col space-y-5 md:flex-row md:space-x-5">
        <img
          className="border-4 rounded-md border-black"
          src={data?.Poster}
          alt={data?.Title}
        />
        <div className="space-y-5">
          <div className="flex justify-center md:justify-normal">
            {renderButton()}
          </div>
          <p>{data?.Plot}</p>
          <p>
            <span className="font-bold">Director:</span> {data?.Director}
          </p>
          <p>
            <span className="font-bold">Actors:</span> {data?.Actors}
          </p>
          <p>
            <span className="font-bold">Genre:</span> {data?.Genre}
          </p>
          <p>
            <span className="font-bold">Released:</span> {data?.Released}
          </p>
          <p>
            <span className="font-bold">Runtime:</span> {data?.Runtime}
          </p>
          <p>
            <span className="font-bold">IMDB Rating:</span> {data?.imdbRating}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;

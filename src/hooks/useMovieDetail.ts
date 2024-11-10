import { useQuery } from "react-query";
import { MOVIE_DB_API_KEY, MOVIE_DB_API_URL } from "../config";
import { MovieDetailResponse } from "../types";

const fetchMovieDetail = async (id: string) => {
  const response = await fetch(
    `${MOVIE_DB_API_URL}/?apikey=${MOVIE_DB_API_KEY}&i=${id}`
  );

  const data = await response.json();
  return data;
};

export const useMovieDetail = (id: string) => {
  const enabled = !!id;

  return useQuery<MovieDetailResponse>({
    enabled,
    queryKey: ["movie", id],
    queryFn: () => fetchMovieDetail(id),
  });
};

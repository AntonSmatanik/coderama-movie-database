import { useInfiniteQuery } from "react-query";
import {
  MINIMUM_SEARCH_LENGTH,
  MOVIE_DB_API_KEY,
  MOVIE_DB_API_URL,
  MOVIES_PER_PAGE,
} from "../config";
import { OMDbSearchResponse } from "../types";

const fetchMovies = async ({
  pageParam = 1,
  query,
}: {
  pageParam?: number;
  query: string;
}) => {
  const response = await fetch(
    `${MOVIE_DB_API_URL}/?apikey=${MOVIE_DB_API_KEY}&s=${query}&page=${pageParam}`
  );

  const data = await response.json();
  return data;
};

export const useSearchMovies = (query: string) => {
  const queryEnabled = query.length >= MINIMUM_SEARCH_LENGTH;

  return useInfiniteQuery<OMDbSearchResponse>({
    enabled: queryEnabled,
    queryKey: ["movies", query],
    queryFn: ({ pageParam }) => fetchMovies({ pageParam, query }),
    getNextPageParam: (lastPage, allPages) => {
      const total = Number(lastPage.totalResults) || 0;
      return allPages.length * MOVIES_PER_PAGE < total
        ? allPages.length + 1
        : undefined;
    },
  });
};

import React, { useCallback, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import MovieCard from "../components/MovieCard";
import { DEBOUNCE_DELAY, SCROLL_KEY, SEARCH_KEY } from "../config";
import { useSearchMovies } from "../hooks/useSearchMovies";
import { initFromLocalStorage } from "../utils";

const SearchPage = () => {
  const interval = useRef<number | null>(null);
  const [search, setSearch] = useState(() => initFromLocalStorage(SEARCH_KEY));
  const [query, setQuery] = useState(search);
  const { data, fetchNextPage, hasNextPage, isFetching, isError, error } =
    useSearchMovies(query);

  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem(SCROLL_KEY);

    if (savedScrollPosition) {
      window.scrollTo({
        top: parseInt(savedScrollPosition),
        behavior: "instant",
      });
    }

    const handleScroll = () => {
      sessionStorage.setItem(SCROLL_KEY, window.scrollY.toString());
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = e.target.value;

      setSearch(newQuery);
      localStorage.setItem(SEARCH_KEY, JSON.stringify(newQuery));

      if (interval.current) {
        clearInterval(interval.current);
      }

      interval.current = window.setTimeout(() => {
        setQuery(newQuery);
      }, DEBOUNCE_DELAY);
    },
    []
  );

  const renderMovies = useCallback(() => {
    if (!data) {
      return <></>;
    }

    if (data?.pages[0].Response === "False") {
      return (
        <div className="p-5 text-center text-red-600 text-xl md:text-2xl">
          {data?.pages[0]?.Error}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {data?.pages
          .flatMap((page) => page.Search)
          .map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
      </div>
    );
  }, [data]);

  const loadMore = useCallback(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  }, [isFetching, fetchNextPage]);

  return (
    <div className="p-5 text-center">
      <input
        type="search"
        className="p-2 border-2 shadow-sm w-full sm:w-2/3 lg:w-1/2"
        value={search}
        onChange={(e) => handleSearchChange(e)}
        placeholder="Search for a movies..."
      />

      {isError && (
        <div className="p-5 text-center text-red-600 text-xl md:text-2xl">
          {(error as { message: string })?.message}
        </div>
      )}

      {isFetching && <div className="pt-5">Loading...</div>}

      <InfiniteScroll loadMore={loadMore} hasMore={hasNextPage}>
        {renderMovies()}
      </InfiniteScroll>
    </div>
  );
};

export default SearchPage;

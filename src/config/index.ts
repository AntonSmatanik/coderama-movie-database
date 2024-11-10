export const MOVIE_DB_API_URL = "http://www.omdbapi.com/";
export const MOVIE_DB_API_KEY = "e6f90255";

export const MINIMUM_SEARCH_LENGTH = 3;

export const queryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      gcTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
    },
  },
};

export const FAVORITES_KEY = "favorites";
export const SEARCH_KEY = "search";
export const SCROLL_KEY = "scroll";

export const DEBOUNCE_DELAY = 750;

//  sadly OMDb API does not provide a way to get more than 10 results per page
export const MOVIES_PER_PAGE = 10;

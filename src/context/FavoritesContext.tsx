import { createContext, useContext, useEffect, useReducer } from "react";
import { FAVORITES_KEY } from "../config";
import { MovieDetailResponse } from "../types";
import { initFromLocalStorage } from "../utils";

type FavoritesReducerAction =
  | { type: "ADD_FAVORITE"; movie: MovieDetailResponse }
  | { type: "REMOVE_FAVORITE"; Title: string };

type FavoritesContextType = {
  favorites: MovieDetailResponse[];
  dispatch: React.Dispatch<FavoritesReducerAction>;
};

const FavoritesContext = createContext<FavoritesContextType>(
  {} as FavoritesContextType
);

// eslint-disable-next-line react-refresh/only-export-components
export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "Error! FavoritesContext called from outside the FavoritesContextProvider"
    );
  }

  return context;
};

const favoritesReducer = (
  state: MovieDetailResponse[],
  action: FavoritesReducerAction
) => {
  switch (action.type) {
    case "ADD_FAVORITE":
      return [...state, action.movie];
    case "REMOVE_FAVORITE":
      return state.filter((movie) => movie.Title !== action.Title);
    /* istanbul ignore next */
    default:
      return state;
  }
};

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, dispatch] = useReducer(favoritesReducer, [], () =>
    initFromLocalStorage(FAVORITES_KEY)
  );

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
};

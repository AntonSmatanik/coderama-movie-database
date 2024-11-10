import { fireEvent, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { FAVORITES_KEY, queryClientConfig } from "../config";
import { FavoritesProvider } from "../context/FavoritesContext";
import {
  mockFetcherEmptyMovieData,
  mockFetcherMovieData,
} from "../tests/__mocks__/fetchMock";
import MoviePage from "./MoviePage";

describe("Movie Page", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    localStorage.clear();
  });

  test("displays proper Error message if wrong movie id is provided", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockFetcherEmptyMovieData),
    });

    const queryClient = new QueryClient(queryClientConfig);

    render(
      <QueryClientProvider client={queryClient}>
        <FavoritesProvider>
          <MemoryRouter
            future={{
              v7_relativeSplatPath: true,
              v7_startTransition: true,
            }}
            initialEntries={["/movie/xxxYYYzzz"]}
          >
            <Routes>
              <Route path="/movie/:id" element={<MoviePage />} />
            </Routes>
          </MemoryRouter>
        </FavoritesProvider>
      </QueryClientProvider>
    );

    await screen.findByText(/Incorrect IMDb ID./i);
  });

  test("displays movie details", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockFetcherMovieData),
    });

    const queryClient = new QueryClient(queryClientConfig);

    render(
      <QueryClientProvider client={queryClient}>
        <FavoritesProvider>
          <MemoryRouter
            future={{
              v7_relativeSplatPath: true,
              v7_startTransition: true,
            }}
            initialEntries={["/movie/12345"]}
          >
            <Routes>
              <Route path="/movie/:id" element={<MoviePage />} />
            </Routes>
          </MemoryRouter>
        </FavoritesProvider>
      </QueryClientProvider>
    );

    await screen.findByText(/Star Wars: Episode IV - A New Hope/i);
    expect(screen.getByText(/George Lucas/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Mark Hamill, Harrison Ford, Carrie Fisher/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Action, Adventure, Fantasy/i)).toBeInTheDocument();
    expect(screen.getByText(/25 May 1977/i)).toBeInTheDocument();
    expect(screen.getByText(/121 min/i)).toBeInTheDocument();
    expect(screen.getByText(/8.6/i)).toBeInTheDocument();
  });

  test("favorite button is functioning properly", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockFetcherMovieData),
    });

    const queryClient = new QueryClient(queryClientConfig);

    render(
      <QueryClientProvider client={queryClient}>
        <FavoritesProvider>
          <MemoryRouter
            future={{
              v7_relativeSplatPath: true,
              v7_startTransition: true,
            }}
            initialEntries={["/movie/12345"]}
          >
            <Routes>
              <Route path="/movie/:id" element={<MoviePage />} />
            </Routes>
          </MemoryRouter>
        </FavoritesProvider>
      </QueryClientProvider>
    );

    expect(localStorage.getItem(FAVORITES_KEY)).toBe(JSON.stringify([]));

    const button = await screen.findByTitle(/Favorite/i);
    fireEvent.click(button);

    await screen.findByTitle(/Unfavorite/i);
    expect(localStorage.getItem("favorites")).toBe(
      JSON.stringify([mockFetcherMovieData])
    );

    fireEvent.click(button);

    await screen.findByTitle(/Favorite/i);
    expect(localStorage.getItem(FAVORITES_KEY)).toBe(JSON.stringify([]));
  });

  test("displays proper Error message if there is an fetch Error", async () => {
    const errorMessage = "Error fetching data";

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockRejectedValueOnce(new Error(errorMessage)),
    });

    const queryClient = new QueryClient(queryClientConfig);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter
          future={{
            v7_relativeSplatPath: true,
            v7_startTransition: true,
          }}
          initialEntries={["/movie/xxxYYYzzz"]}
        >
          <Routes>
            <Route path="/movie/:id" element={<MoviePage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    await screen.findByText(new RegExp(errorMessage, "i"));
  });
});

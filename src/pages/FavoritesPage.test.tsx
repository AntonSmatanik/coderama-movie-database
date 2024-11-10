import { FAVORITES_KEY } from "../config";
import { mockMovies } from "../tests/__mocks__/localStorageMock";
import { render, screen } from "../tests/utils/renderWithProviders";
import FavoritesPage from "./FavoritesPage";

describe("Favorites Page", () => {
  afterEach(() => {
    localStorage.clear();
  });

  test("displays My Favorite Movies", () => {
    render(<FavoritesPage />);

    expect(screen.getByText(/My Favorite Movies/i)).toBeInTheDocument();
  });

  test("displays favorite movies", async () => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(mockMovies));

    render(<FavoritesPage />);

    let link = await screen.findByRole("link", {
      name: /Inception/i,
    });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/movie/tt1375666");

    link = await screen.findByRole("link", {
      name: /Interstellar/i,
    });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/movie/tt0816692");

    const images = await screen.findAllByRole("img");
    expect(images).toHaveLength(2);
  });
});

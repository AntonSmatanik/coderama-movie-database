import { Route, Routes } from "react-router-dom";
import { fireEvent, render, screen } from "../tests/utils/renderWithProviders";
import FavoritesPage from "./FavoritesPage";
import NotFound from "./NotFound";

describe("NotFound Page", () => {
  test("displays 404 error message", () => {
    render(<NotFound />);

    expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument();
  });

  test("displays links go back home and go to favorites", () => {
    render(<NotFound />);

    let link = screen.getByRole("link", { name: /Go Back Home/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");

    link = screen.getByRole("link", { name: /Go To Favorites/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/favorites");
  });

  test('clicking on "Go To Favorites" redirects to favorites page', () => {
    render(
      <Routes>
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );

    const link = screen.getByRole("link", { name: /Go To Favorites/i });
    fireEvent.click(link);

    expect(window.location.pathname).toBe("/favorites");
    expect(screen.getByText(/My Favorite Movies/i)).toBeInTheDocument();
  });
});

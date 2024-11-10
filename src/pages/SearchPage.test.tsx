import { SEARCH_KEY } from "../config";
import {
  mockFetcherSearchEmptyMoviesData,
  mockFetcherSearchMoviesData,
} from "../tests/__mocks__/fetchMock";
import { fireEvent, render, screen } from "../tests/utils/renderWithProviders";
import SearchPage from "./SearchPage";

describe("Search Page", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    localStorage.clear();
  });

  test("sarch box value is changed correctly", () => {
    const firstValue = "star wars";
    const secondValue = "star trek";

    render(<SearchPage />);

    const searchBox = screen.getByRole("searchbox");

    fireEvent.change(searchBox, { target: { value: firstValue } });
    expect(searchBox).toHaveValue(firstValue);
    expect(localStorage.getItem(SEARCH_KEY)).toBe(JSON.stringify(firstValue));

    fireEvent.change(searchBox, { target: { value: secondValue } });
    expect(searchBox).toHaveValue(secondValue);
    expect(localStorage.getItem(SEARCH_KEY)).toBe(JSON.stringify(secondValue));
  });

  test("after searching for a movie that doesn't exist, proper Error message is displayed", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockFetcherSearchEmptyMoviesData),
    });

    render(<SearchPage />);

    const searchBox = screen.getByRole("searchbox");
    fireEvent.change(searchBox, { target: { value: "XYZXYZXYZ" } });

    await screen.findByText(/Movie not found!/i);
  });

  test("after searching for an existing movie, the correct results are displayed", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockFetcherSearchMoviesData),
    });

    render(<SearchPage />);

    const searchBox = screen.getByRole("searchbox");

    fireEvent.change(searchBox, { target: { value: "star trek" } });

    const images = await screen.findAllByRole("img");
    expect(images).toHaveLength(10);

    let link = await screen.findByRole("link", {
      name: /Star Trek II: The Wrath of Khan/i,
    });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/movie/tt0084726");

    link = await screen.findByRole("link", {
      name: /Star Trek: The Next Generation/i,
    });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/movie/tt0092455");
  });

  // test("displays proper Error message if there is an fetch Error", async () => {
  //   const errorMessage = "Error fetching data";

  //   (global.fetch as jest.Mock).mockResolvedValueOnce({
  //     json: jest.fn().mockRejectedValueOnce(new Error(errorMessage)),
  //   });

  //   render(<SearchPage />);

  //   await screen.findByText(new RegExp(errorMessage, "i"));
  // });
});

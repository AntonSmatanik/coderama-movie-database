# Simple movie application

The application is created in **React**, with **Vite** build tool and **Typescript**. It consist of 3 (+ 1) pages.

I decided to use **Tailwindcss** (lightweight, performative, highly customizable, etc.) for styling and **React Query** (out-of-the-box solutions, caching, build-in functions, etc.) for data manipulation.

**Code splitting** and **lazy loading** techniques are used along with some others.

## Pages

### Movie search

There is a search field without any button. The results are displayed as the user types in them. Debounce delay is implemented and is configurable in [settings](/src/config/index.ts).

While the results are being retrieved from the API, a corresponding message is displayed to the user.

If there are no results to display, a clear message is displayed to the user informing them of this.

Results are cached. If a user searches for the same movie twice, the app does not make a new API request, but instead uses the cached data.

Infinite scrolling works well, it takes new data from the API and displays it as the user scrolls down.

If user changes the route and then returns back, restored are scroll position, search results and search query.

With search query persisted in a localstorage, the results can be easily retrieved again, even after user close and reopen the browser.

### Movie detail

A Loader will appear while loading movie details from the API.

If the movie id is incorrect, the user is informed by an error message returned from the API.

The page contains all information about the selected film (title, year, genre, poster, etc.).

The star button saves/removes the movie to/from favorites.

Movie API results are cached, so a new request for the same movie is not necessary.

### My favorite movies

Movies are displayed in the similar way as search results, in a clean and simple grid layout.

Favorites are kept in local storage so they are refreshed even if the user closes and reopens the browser.

## Corner cases

- if an incorrect route is entered, the router displays a Not Found page
- if movie id is incorrect, Movie detail page displays an error
- if movie can't be found in the API, Error message from the response is displayed
- if is used wrong API KEY, Error message from the response is displayed
- if API URL is wrong, Error message is displayed
- the entire application is wrapped in an Error Boundary with the possibility of resetting its state

## Tests

Test coverage is relatively high. Unit tests simulate different kinds of scenarios on all viewable pages and components.

There are mocks for API requests and local storage data.

I created a custom render method to avoid code repetitions and to centralize the logic in one place for better maintainability.

It was necessary to mock the SVG files.

There are no warnings in unit tests. To run them, use command `npm run test`.

## How to run the App

First you have to install NPM packages with command `npm install`.

After that you can run the dev server using `npm run dev`.

Or you can build the app using `npm run build` and hit `npm run preview`.

There are no lint errors, no lint warnings or console warnings.

## Commands

```bash
- dev - starts the dev server
- build - compiles and bundles the project’s source code
- lint - runs a linter to check the code for style issues, potential errors, or deviations from coding standards
- preview - launch the application that was previously built into the dist folder
- test - run tests for the project
```

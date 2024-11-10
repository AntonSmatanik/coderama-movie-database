import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { queryClientConfig } from "./config";
import { FavoritesProvider } from "./context/FavoritesContext";
import NotFound from "./pages/NotFound";

const SearchPage = lazy(() => import("./pages/SearchPage"));
const MoviePage = lazy(() => import("./pages/MoviePage"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"));

const queryClient = new QueryClient(queryClientConfig);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <FavoritesProvider>
      <BrowserRouter
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true,
        }}
      >
        <Header />
        <main className="max-w-5xl mx-auto p-4">
          <Suspense
            fallback={<div className="pt-5 text-center">Loading Page...</div>}
          >
            <Routes>
              <Route path="/" element={<SearchPage />} />
              <Route path="/movie/:id" element={<MoviePage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
      </BrowserRouter>
    </FavoritesProvider>
  </QueryClientProvider>
);

export default App;

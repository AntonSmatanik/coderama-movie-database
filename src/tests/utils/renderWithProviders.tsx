import { RenderOptions, render as rtlRender } from "@testing-library/react";

import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { queryClientConfig } from "../../config";
import { FavoritesProvider } from "../../context/FavoritesContext";

const render = (ui: React.ReactElement, options?: RenderOptions) => {
  const queryClient = new QueryClient(queryClientConfig);

  return rtlRender(
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <BrowserRouter
          future={{
            v7_relativeSplatPath: true,
            v7_startTransition: true,
          }}
        >
          {ui}
        </BrowserRouter>
      </FavoritesProvider>
    </QueryClientProvider>,
    options
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";

export { render };

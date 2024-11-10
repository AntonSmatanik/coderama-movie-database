import { FallbackProps } from "react-error-boundary";

export const initFromLocalStorage = (key: string) => {
  const localData = localStorage.getItem(key);
  return localData ? JSON.parse(localData) : [];
};

export const fallbackRender = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => (
  <div className="p-5 flex items-center justify-center h-screen" role="alert">
    <div>
      <p className="text-2xl">Something went wrong:</p>
      <pre className="my-5 text-red-500">{error.message}</pre>
      <button
        className="p-2 block m-auto w-36 rounded-md shadow-md bg-blue-500 hover:bg-blue-300"
        onClick={() => resetErrorBoundary()}
      >
        Reset
      </button>
    </div>
  </div>
);

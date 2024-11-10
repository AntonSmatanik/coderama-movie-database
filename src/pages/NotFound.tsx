import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="p-5 flex flex-col items-center justify-center">
    <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
    <p className="text-lg mt-2">
      Sorry, the page you're looking for doesn't exist.
    </p>
    <Link to="/" className="mt-4 text-blue-500 underline">
      Go Back Home
    </Link>
    <Link to="/favorites" className="mt-4 text-blue-500 underline">
      Go To Favorites
    </Link>
  </div>
);

export default NotFound;

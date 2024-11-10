import { Link, NavLink } from "react-router-dom";

const Header = () => (
  <header className="p-4 bg-blue-500 text-white">
    <nav className="flex justify-between max-w-5xl mx-auto">
      <Link to="/">Anton's Movie Database</Link>
      <div className="space-x-10">
        <NavLink
          className={({ isActive }) => (isActive ? "font-bold" : "")}
          to="/"
        >
          Search
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "font-bold" : "")}
          to="/favorites"
        >
          Favorites
        </NavLink>
      </div>
    </nav>
  </header>
);

export default Header;

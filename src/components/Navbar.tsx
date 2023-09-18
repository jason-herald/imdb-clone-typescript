import { Link } from "react-router-dom";
import "../App.css";

const Navbar = (): JSX.Element => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Vitejs-logo.svg"
          alt="Logo"
          className="navbar-logo"
        />
        <Link to="/">
          <h2 className="nav-heading">Vite Movies</h2>
        </Link>
      </div>
      <div className="navbar-right">
        <Link to="/" className="navbar-link">
          Movies
        </Link>
        <Link to="/tv-shows" className="navbar-link">
          TV Shows
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

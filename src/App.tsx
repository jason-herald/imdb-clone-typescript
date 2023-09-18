import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProductListingPage from "./pages/MoviesListingPage";

import ProductListingPageTvShows from "./pages/TvShowsListingPage";
import TVShowDetailsPage from "./pages/TVShowDetailsPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import "./App.css";
import "./types";

const App = (): JSX.Element => {
  return (
    <Router>
      <div className="App">
        <div className="header">
          <Navbar />
        </div>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<ProductListingPage />} />
            <Route path="/tv-shows" element={<ProductListingPageTvShows />} />
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
            <Route path="/tv/:id" element={<TVShowDetailsPage />} />
          </Routes>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;

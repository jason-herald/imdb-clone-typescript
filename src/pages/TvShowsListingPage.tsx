import React, { useEffect, useState } from "react";
import { fetchPopularTVShows } from "../helpers/api";
import MovieCard from "../components/MovieCard";
import FilterModal from "../components/FilterModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faTimes } from "@fortawesome/free-solid-svg-icons";

const ProductListingPageTvShows = () => {
  const [tvShows, setTVShows] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState({
    rating: 0,
    originalLanguage: "all",
    popularity: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTVShows = await fetchPopularTVShows();
      let filteredTVShows = fetchedTVShows;
      if (filter.rating > 0) {
        filteredTVShows = filteredTVShows.filter(
          (movie) => movie.vote_average / 2 >= filter.rating
        );
      }
      if (filter.originalLanguage !== "all") {
        filteredTVShows = filteredTVShows.filter(
          (movie) => movie.original_language === filter.originalLanguage
        );
      }
      if (filter.popularity !== "all") {
        filteredTVShows = filteredTVShows.filter((movie) => {
          const popularity = parseFloat(movie.popularity);
          return popularity >= parseFloat(filter.popularity);
        });
      }
      setTVShows(filteredTVShows);
    };

    fetchData();
  }, [filter]);

  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    setFilter({
      ...filter,
      [id]: value,
    });
  };

  const clearFilters = () => {
    setFilter({
      rating: 0,
      originalLanguage: "all",
      popularity: 0,
    });
  };

  const closeFilterModal = () => {
    setShowModal(false);
  };
  return (
    <div className="container">
      <div className="heading-row">
        <h2 className="heading">Popular TV Shows</h2>
        <div className="filter-button-container">
          <FontAwesomeIcon
            icon={showModal ? faTimes : faFilter}
            onClick={() => setShowModal(!showModal)}
            className="filter-icon"
          />

          <FilterModal
            show={showModal}
            handleFilterChange={handleFilterChange}
            clearFilters={clearFilters}
            filters={filter}
            closeFilterModal={closeFilterModal}
          />
        </div>
      </div>

      <div className="tvshow-list">
        {tvShows?.map((show) => (
          <MovieCard key={show.id} movie={show} isMovie={false} />
        ))}
      </div>
    </div>
  );
};

export default ProductListingPageTvShows;

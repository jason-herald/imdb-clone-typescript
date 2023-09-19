import { useEffect, useState, ChangeEvent } from "react";
import { fetchPopularTVShows } from "../helpers/api";
import MovieCard from "../components/MovieCard";
import FilterModal from "../components/FilterModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faTimes } from "@fortawesome/free-solid-svg-icons";
import { type Filter, type TVShow } from "../lib/types";


const ProductListingPageTvShows = (): ReturnType<React.FC> => {
  const [tvShows, setTVShows] = useState<TVShow[]>([]);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [filter, setFilter] = useState<Filter>({
    rating: 0,
    originalLanguage: "all",
    popularity: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTVShows = await fetchPopularTVShows();
      let filteredTVShows: TVShow[] = fetchedTVShows;
      if (filter.rating > 0) {
        filteredTVShows = filteredTVShows.filter(
          (movie: TVShow) => movie.vote_average / 2 >= filter.rating
        );
      }
      if (filter.originalLanguage !== "all") {
        filteredTVShows = filteredTVShows.filter(
          (movie: TVShow) => movie.original_language === filter.originalLanguage
        );
      }
      if (filter.popularity > 0) {
        filteredTVShows = filteredTVShows.filter((movie: TVShow) => {
          const popularity = movie.popularity;
          return popularity >= filter.popularity;
        });
      }
      setTVShows(filteredTVShows);
    };

    fetchData();
  }, [filter]);

  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { id, value } = e.target;
    setFilter({
      ...filter,
      [id]: value,
    });
  };

  const clearFilters = (): void => {
    setFilter({
      rating: 0,
      originalLanguage: "all",
      popularity: 0,
    });
  };

  const closeFilterModal = (): void => {
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
        {tvShows?.map((show: TVShow) => (
          <MovieCard key={show.id} movie={show} isMovie={false} />
        ))}
      </div>
    </div>
  );
};

export default ProductListingPageTvShows;

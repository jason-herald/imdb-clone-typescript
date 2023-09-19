import { useEffect, useState, ChangeEvent } from "react";
import MovieCard from "../components/MovieCard";
import { fetchPopularMovies } from "../helpers/api";
import FilterModal from "../components/FilterModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faTimes } from "@fortawesome/free-solid-svg-icons";
import { type Filter, type Movie } from "../lib/types";

const ProductListingPage = (): ReturnType<React.FC> => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filter, setFilter] = useState<Filter>({
    rating: 0,
    originalLanguage: "all",
    popularity: 0,
  });
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedMovies = await fetchPopularMovies();

      let filteredMovies: Movie[] = fetchedMovies;
      if (filter.rating > 0) {
        filteredMovies = filteredMovies.filter(
          (movie: Movie) => movie.vote_average / 2 >= filter.rating
        );
      }
      if (filter.originalLanguage !== "all") {
        filteredMovies = filteredMovies.filter(
          (movie: Movie) => movie.original_language === filter.originalLanguage
        );
      }
      if (filter.popularity > 0) {
        filteredMovies = filteredMovies.filter((movie: Movie) => {
          const popularity = movie.popularity;
          return popularity >= filter.popularity;
        });
      }
      setMovies(filteredMovies);
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

  const closeFilterModal = (): void => {
    setShowModal(false);
  };

  const clearFilters = (): void => {
    setFilter({
      rating: 0,
      originalLanguage: "all",
      popularity: 0,
    });
  };

  return (
    <div className="container">
      <div className="heading-row">
        <h2 className="heading">Popular Movies</h2>
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
      <div className="movie-list">
        {movies.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default ProductListingPage;

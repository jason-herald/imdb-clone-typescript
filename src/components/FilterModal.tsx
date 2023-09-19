import { ChangeEvent, MouseEventHandler } from "react";
import "../App.css";
import { type Filter } from "../lib/types";
type FilterModalProps = {
  show: boolean;
  handleFilterChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  clearFilters: () => void;
  filters: Filter;
  closeFilterModal: () => void;
};
const FilterModal = ({
  show,
  handleFilterChange,
  clearFilters,
  filters,
  closeFilterModal,
}: FilterModalProps) => {
  if (!show) {
    return null;
  }

  const stopPropagation: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };
  const onStarClick = (rating: number) => {
    handleFilterChange({
      target: { id: "rating", value: rating },
    } as unknown as ChangeEvent<HTMLInputElement>);
  };
  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFilterChange(e);
  };
  return (
    <div className="modal" onClick={closeFilterModal}>
      <div className="modal-content" onClick={stopPropagation}>
        <h2 className="filter-heading">Filters</h2>
        <div className="modal-content-flex">
          <div className="filter-star-container">
            <h3 className="star-rating-heading">Filter by Star Rating</h3>
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className={`filter-star-row ${
                  index < filters.rating ? "filter-active" : ""
                }`}
                onClick={() => onStarClick(index + 1)}
              >
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <span
                    key={starIndex}
                    className={`filter-star ${
                      starIndex <= index ? "filter-filled-star" : ""
                    }`}
                  >
                    {starIndex <= index ? "★" : "☆"}
                  </span>
                ))}
              </div>
            ))}
          </div>

          <div className="filter-star-container">
            <h3 className="star-rating-heading">Filter by Language</h3>
            <select
              id="originalLanguage"
              className="filter-select"
              onChange={handleFilterChange}
              value={filters.originalLanguage}
            >
              <option value="all">All</option>
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="cn">Chinese</option>
              <option value="es">Spanish</option>
            </select>
          </div>

          <div className="filter-star-container">
            <h3 className="star-rating-heading">Filter by Popularity</h3>
            <div className="slider-container">
              <span className="slider-label">0</span>
              <input
                type="range"
                id="popularity"
                min="0"
                max="3000"
                step="100"
                value={filters.popularity}
                onChange={handleSliderChange}
                className="popularity-slider"
              />
              <span className="slider-label">3000+</span>
            </div>
            <div className="slider-value">
              Current Value:{filters.popularity}
            </div>
          </div>
          <button className="clear-filters-button" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;

import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import CardImage from "./CardImage";
import { type Movie, type TVShow } from "../lib/types";

type MovieCardProps = { movie: Movie | TVShow; isMovie?: boolean };
const MovieCard = ({ movie, isMovie = true }: MovieCardProps) => {
  const posterUrl: string = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;

  if ("title" in movie && isMovie) {
    return (
      <div className="movie-card">
        <Link to={`/movie/${movie.id}`}>
          <CardImage src={posterUrl} alt={movie.title} />

          <h2 className="movie-title">{movie?.title}</h2>
          <div className="movie-info">
            <div className="movie-rating">
              <StarRating vote_average={movie.vote_average} />
            </div>
            <div className="movie-release-date">
              {`Release Date: ${movie.release_date}`}
            </div>
          </div>
        </Link>
      </div>
    );
  } else if ("name" in movie) {
    return (
      <div className="movie-card">
        <Link to={`/tv/${movie.id}`}>
          <CardImage src={posterUrl} alt={movie.name} />
          <h2 className="movie-title">{movie.name}</h2>
          <div className="movie-info">
            <div className="movie-rating">
              <StarRating vote_average={movie.vote_average} />
            </div>
            <div className="movie-release-date">
              {`First Aired On: ${movie.first_air_date}`}
            </div>
          </div>
        </Link>
      </div>
    );
  }
};

export default MovieCard;

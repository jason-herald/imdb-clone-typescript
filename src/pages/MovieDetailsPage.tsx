import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieImages,
} from "../helpers/api";
import "../App.css";
import {
  type Credits,
  type MovieDetails,
  type Image,
  type Cast,
  type Backdrop,
  type Crew,
} from "../lib/types";

const MovieDetailsPage = (): ReturnType<React.FC> => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetails>({} as MovieDetails);
  const [credits, setCredits] = useState<Credits>({} as Credits);
  const [images, setImages] = useState<Image>({} as Image);

  useEffect(() => {
    const fetchDetails = async () => {
      if (typeof id === "string") {
        const fetchedMovie = await fetchMovieDetails(id);
        const fetchedCredits = await fetchMovieCredits(id);
        const fetchedImages = await fetchMovieImages(id);
        setMovie(fetchedMovie);
        setCredits(fetchedCredits);
        setImages(fetchedImages);
      }
    };

    fetchDetails();
  }, [id]);

  return (
    <div>
      {movie?.poster_path ? (
        <div className="movie-details">
          <div className="section details">
            <div className="left-side">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
            <div className="right-side">
              <h1 className="movie-title">{movie.title}</h1>
              <div className="info-line">
                <span className="star-rating">
                  <span className="orange-star">&#9733; </span>
                  {movie.vote_average * 10}%
                </span>
                <span className="separator">|</span>
                <span className="release-date">{movie.release_date}</span>
                <span className="separator">|</span>
                <span className="genres">
                  {movie.genres?.map((g) => g.name).join(", ")}
                </span>
              </div>
              <p className="overview-text">{movie.overview}</p>
              <div className="crew-line">
                {credits.crew?.slice(0, 3).map((crewMember: Crew) => (
                  <div className="crew-member" key={crewMember.id}>
                    <span>{crewMember.name}</span>
                    <span className="crew-role">{crewMember.job}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="section">
            <h2 className="cast-heading">Cast</h2>
            <div className="cast">
              {credits.cast?.slice(0, 5).map((actor: Cast) => (
                <div key={actor.id}>
                  <img
                    className="cast-img"
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                  />
                  <div>{actor.name}</div>
                  <div className="role">{actor.character}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="section images">
            <h2 className="images-heading">Images</h2>
            <div>
              {images.backdrops
                ?.slice(0, 6)
                .map((image: Backdrop, index: number) => (
                  <img
                    className="movie-img"
                    key={index}
                    src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                    alt="Movie backdrop"
                  />
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div>Loadingg</div>
      )}
    </div>
  );
};

export default MovieDetailsPage;

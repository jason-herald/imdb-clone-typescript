import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchTVShowDetails,
  fetchTVShowCredits,
  fetchTVShowImages,
} from "../helpers/api";
import "../App.css";
import {
  type TVShowDetails,
  type Credits,
  type Image,
  type Crew,
  type Backdrop,
  type Cast,
} from "../lib/types";

const TVShowDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<TVShowDetails>({} as TVShowDetails);
  const [credits, setCredits] = useState<Credits>({} as Credits);
  const [images, setImages] = useState<Image>({} as Image);

  useEffect(() => {
    const fetchDetails = async () => {
      if (typeof id == "string") {
        const fetchedMovie = await fetchTVShowDetails(id);
        const fetchedCredits = await fetchTVShowCredits(id);
        const fetchedImages = await fetchTVShowImages(id);
        setMovie(fetchedMovie);
        setCredits(fetchedCredits);
        setImages(fetchedImages);
      }
    };

    fetchDetails();
  }, [id]);

  return (
    <div className="movie-details">
      <div className="section details">
        <div className="left-side">
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.name}
          />
        </div>
        <div className="right-side">
          <h1 className="movie-title">{movie.name}</h1>
          <div className="info-line">
            <span className="star-rating">
              <span className="orange-star">&#9733; </span>
              {Math.round(movie.vote_average * 10)}%
            </span>
            <span className="separator">|</span>
            <span className="release-date">{movie.first_air_date}</span>
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
          {images.backdrops?.slice(0, 6).map((image: Backdrop, index) => (
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
  );
};

export default TVShowDetailsPage;

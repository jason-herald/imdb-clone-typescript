import "../App.css";

type cardImageProps = { src: string; alt: string };

const CardImage = ({ src, alt }: cardImageProps): JSX.Element => {
  return <img className="movie-poster" src={src} alt={alt} />;
};

export default CardImage;

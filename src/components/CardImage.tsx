import "../App.css";

type cardImageProps = { src: string; altText: string };

const CardImage = ({ src, altText }: cardImageProps): JSX.Element => {
  return <img className="movie-poster" src={src} alt={altText} />;
};

export default CardImage;

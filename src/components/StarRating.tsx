import "../App.css";

const StarRating = ({
  vote_average,
}: {
  vote_average: number;
}): JSX.Element => {
  const rating: number = Math.round(vote_average / 2);
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} className="star">
          {index < rating ? "★" : "☆"}
        </span>
      ))}
      <span className="rating-value">({vote_average / 2})</span>
    </>
  );
};

export default StarRating;

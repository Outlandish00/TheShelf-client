import "./MovieCard.css";

export const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card-outer">
      <div className="movie-card-image">
        <img src={movie.Poster} />
      </div>
    </div>
  );
};

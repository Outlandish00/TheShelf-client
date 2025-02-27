export const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card-outer">
      <div className="movie-card-image"></div>
      <div className="movie-card-title">
        <h2>{movie.title}</h2>
      </div>
    </div>
  );
};

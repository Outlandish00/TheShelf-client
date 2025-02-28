import { useEffect } from "react";
import { saveMovie } from "../../managers/movieManager";

export const ExistingMovieCard = ({
  OmdbMovieObject,
  setSearched,
  loggedInUser,
  setNewMovieTitle,
  setOmbdMovieObject,
}) => {
  const handleYes = () => {
    const newMovieObject = {
      userId: loggedInUser.id,
      title: OmdbMovieObject.Title,
      genre: OmdbMovieObject.Genre,
      actors: OmdbMovieObject.Actors,
      director: OmdbMovieObject.Director,
      posterLink: OmdbMovieObject.Poster,
      rated: OmdbMovieObject.Rated,
      rating: OmdbMovieObject.imdbRating,
      releaseYEar: OmdbMovieObject.Year,
    };
    console.log(newMovieObject);
    saveMovie(newMovieObject).then(() => setSearched(false));
  };
  const handleNo = () => {
    setSearched(false);
    setOmbdMovieObject({});
    setNewMovieTitle("");
  };
  return (
    <div className="searched-movie-container">
      <div className="searched=movie-question">
        <h1>Is this the movie?</h1>
      </div>
      <div className="searched-movie-image">
        <img src={OmdbMovieObject.Poster} />
      </div>
      <div className="searched-movie-title">
        <h1>{OmdbMovieObject.Title}</h1>
      </div>
      <div className="searched-movie-actors">
        <h2>Actors: {OmdbMovieObject.Actors}</h2>
      </div>
      <div className="searched-movie-release">
        <h2>Released On: {OmdbMovieObject.Released}</h2>
      </div>
      <div className="searched-movie-buttons">
        <button onClick={() => handleYes()}>Yes</button>
        <button onClick={() => handleNo()}>No</button>
      </div>
    </div>
  );
};

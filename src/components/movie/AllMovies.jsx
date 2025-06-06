import { useEffect, useState } from "react";
import {
  getMovies,
  searchForMovieDataByImbdId,
} from "../../managers/movieManager";
import { MovieCard } from "./MovieCard";
import { useNavigate } from "react-router-dom";
import "./AllMovies.css";
import ImdbLogo from "../../assets/IMDB-Logo.svg";

export const AllMovies = ({
  usersWatchlist,
  loggedInUser,
  setUsersWatchlist,
  searchedLetters,
}) => {
  const navigate = useNavigate();
  const [omdbMovieObjects, setOmdbMovieObjects] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const handleClick = (omdbMovie) => {
    const foundMovie = movies.find((m) => m.imbdId === omdbMovie.imdbID);
    if (foundMovie) {
      navigate(`/movie/${foundMovie.id}`);
    } else {
      console.log(`Movie not found for imdbId: ${omdbMovie.imbdID}`);
    }
  };

  const getMoviesDetails = async () => {
    let movieObjects = [];

    movieObjects = await Promise.all(
      movies.map((m) => {
        return searchForMovieDataByImbdId(m.imbdId);
      })
    );
    setOmdbMovieObjects(movieObjects);
    setFilteredMovies(movieObjects);
  };

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies().then((data) => {
      setMovies(data);
    });
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      getMoviesDetails();
    }
  }, [movies]);

  useEffect(() => {
    const filtered = omdbMovieObjects.filter((movie) =>
      movie.Title?.toLowerCase().includes(searchedLetters.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [searchedLetters, omdbMovieObjects]);

  return (
    <>
      <div className="moviecard-container">
        {filteredMovies.map((m) => {
          return (
            <>
              <div
                key={m.id}
                onClick={() => handleClick(m)}
                className="all-movies-container"
              >
                <MovieCard
                  key={m.id}
                  usersWatchlist={usersWatchlist}
                  movie={m}
                  loggedInUser={loggedInUser}
                  setUsersWatchlist={setUsersWatchlist}
                />
                <div className="hover-text">{m.Title}</div>
                <div className="bottom-hover-text">
                  <div className="imdb-rating-all">
                    {m.imdbRating}
                    <img src={ImdbLogo} className="imdb-logo-allmovies" />
                  </div>
                  <div className="rating-letter">{m.Rated}</div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

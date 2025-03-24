import { Avatar, Dialog, Form, Tabs } from "radix-ui";
import { useState } from "react";
import {
  saveMovie,
  searchForMovieDataByImbdId,
  searchForMovieDataByTitle,
} from "../../managers/movieManager";
import "./NewMovie.css";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import MetaLogo from "../../assets/Metacritic-logo.png";
import ImdbLogo from "../../assets/IMDB-Logo.svg";
import { useNavigate } from "react-router-dom";

export const NewMovie = ({ loggedInUser }) => {
  const navigate = useNavigate();
  const [newMovieTitle, setNewMovieTitle] = useState("");

  const [movieList, setMovieList] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searched, setSearched] = useState(false);
  const [movieDetailsDialog, setMovieDetailsDialog] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState({});

  const searchForMovie = (title, page = 1) => {
    console.log(title);
    searchForMovieDataByTitle(title, page).then((data) => {
      if (data && data.Search) {
        setMovieList((prevMovies) =>
          page === 1 ? data.Search : [...prevMovies, ...data.Search]
        );
        setTotalResults(data.totalResults);
        setCurrentPage(page);
      } else {
        setMovieList([]);
        setTotalResults(0);
      }
    });
  };

  const saveSelectedMovie = () => {
    const newMovie = {
      imbdId: selectedMovie?.imdbID,
    };
    saveMovie(newMovie).then(() => {
      setMovieDetailsDialog(false);
      setSelectedMovie({});
      setTotalResults(0);
      setNewMovieTitle("");
      navigate("/movie/all");
    });
  };

  const getMovieDetails = (imdbId) => {
    searchForMovieDataByImbdId(imdbId).then((res) => setSelectedMovie(res));
    setMovieDetailsDialog(true);
  };

  const resultsPerPage = 10;

  const displayedMovies = movieList.slice(0, currentPage * resultsPerPage);

  return (
    <div className="new-movie-container">
      <div className="new-movie-header-container">
        <div className="new-movie-header">Search for a movie title!</div>
        <div className="new-movie-subheader">
          TheShelf will get its info, and make sure it's the right movie.
        </div>
      </div>
      <div className="new-movie-content">
        <Form.Root className="newMovie-formRoot">
          <Form.Field className="newMovie-name">
            <Form.Control asChild>
              <input
                type="text"
                className="newMovie-title-input"
                value={newMovieTitle}
                onChange={(event) => setNewMovieTitle(event.target.value)}
              />
            </Form.Control>
          </Form.Field>
        </Form.Root>
        <Dialog.Root open={searched} className="searched-movies-root">
          <Dialog.Trigger asChild>
            <div className="icon-container">
              <MagnifyingGlassIcon
                className="title-search"
                onClick={(event) => {
                  event.preventDefault();
                  setCurrentPage(1);
                  searchForMovie(newMovieTitle);
                  setSearched(true);
                }}
              />
            </div>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="movie-search-overlay">
              <Dialog.Content className="movie-search-content">
                <Dialog.Title className="movie-search-title">
                  Found Movies
                </Dialog.Title>
                <div className="movie-results-container">
                  {displayedMovies?.map((movie) => (
                    <div
                      key={movie.imdbID}
                      className="movie-card"
                      onClick={() => {
                        setSearched(false);
                        getMovieDetails(movie.imdbID);
                      }}
                    >
                      <img src={selectedMovie.Poster} />
                      <Avatar.Root className="avatarRoot">
                        <Avatar.Image id="movie-image" src={movie.Poster} />
                        <Avatar.Fallback className="movie-fallback">
                          {movie.Title}
                        </Avatar.Fallback>
                      </Avatar.Root>
                      <div className="hover-title">{movie.Title}</div>
                    </div>
                  ))}
                </div>
                {displayedMovies.length < totalResults && (
                  <button
                    className="load-more-button"
                    onClick={() => {
                      const nextPage = currentPage + 1;
                      setCurrentPage(nextPage);
                      searchForMovie(newMovieTitle, nextPage);
                    }}
                  >
                    Load More...
                  </button>
                )}
              </Dialog.Content>
            </Dialog.Overlay>
          </Dialog.Portal>
        </Dialog.Root>
        <Dialog.Root open={movieDetailsDialog}>
          <Dialog.Portal>
            <Dialog.Overlay className="movie-details-overlay">
              <Dialog.Content className="movie-details-content">
                <div className="left-side-of-details">
                  <img src={selectedMovie.Poster} />
                  <div className="more-details">
                    <div className="newMovie-imdb-rating">
                      {selectedMovie.imdbRating}
                      <img src={ImdbLogo} className="details-imdb-logo" />
                    </div>
                    <div className="newMovie-metacritic">
                      {selectedMovie.Metascore}
                      <img src={MetaLogo} className="details-meta-logo" />
                    </div>
                  </div>
                </div>
                <div className="right-side-of-details">
                  <div className="found-movie-header">
                    <span className="movie-title">{selectedMovie.Title}</span>
                    <div className="right-side-of-header">
                      <span className="movie-year">{selectedMovie.Year}</span>
                      <span className="by">directed by</span>
                      <span className="movie-director">
                        {selectedMovie.Director}
                      </span>
                    </div>
                  </div>
                  <div className="details-div">
                    <div className="actors-container">
                      <h4>Actors:</h4> {selectedMovie.Actors}
                    </div>
                    <div className="director-container">
                      <h4>Director: </h4> {selectedMovie.Director}
                    </div>
                    <div className="genre-container">
                      <h4>Genre:</h4>
                      {selectedMovie.Genre}
                    </div>
                    <div className="rated-container">
                      <h4>Rated:</h4>
                      {selectedMovie.Rated}
                    </div>
                  </div>

                  <div className="button-container">
                    <Dialog.Close asChild>
                      <button
                        onClick={() => {
                          setMovieDetailsDialog(false);
                          setSelectedMovie({});
                          setTotalResults(0);
                          setNewMovieTitle("");
                        }}
                      >
                        Close
                      </button>
                    </Dialog.Close>
                    <Dialog.Close asChild>
                      <button
                        onClick={() => {
                          saveSelectedMovie();
                        }}
                      >
                        Add
                      </button>
                    </Dialog.Close>
                  </div>
                </div>
              </Dialog.Content>
            </Dialog.Overlay>
          </Dialog.Portal>
        </Dialog.Root>
        {/* <div>
        {searched && (
          <ExistingMovieCard
            OmdbMovieObject={OmdbMovieObject}
            setSearched={setSearched}
            loggedInUser={loggedInUser}
            setNewMovieTitle={setNewMovieTitle}
            setOmbdMovieObject={setOmbdMovieObject}
          />
        )}
      </div> */}
      </div>
    </div>
  );
};

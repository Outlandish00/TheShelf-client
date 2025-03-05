import { useEffect, useState } from "react";
import {
  getMovieById,
  searchForMovieDataByImbdId,
} from "../../managers/movieManager";
import { useParams } from "react-router-dom";
import ImdbLogo from "../../assets/IMDB-Logo.svg";
import "./MovieDetails.css";
import { Dialog } from "radix-ui";
import { newWatchlistMedia } from "../../managers/wathchlistMediaManager";

export const MovieDetails = ({ usersWatchlist }) => {
  const [omdbMovie, setOmdbMovie] = useState({});
  const [movie, setMovie] = useState({});
  const [showPlot, setShowPlot] = useState(false);
  const { id } = useParams();
  const [selectedWatchlistId, setSelectedWatchlistId] = useState(0);
  const [isAlreadyInWatchlist, setIsAlreadyInWatchlist] = useState(false);
  const [moviesWatchlist, setMoviesWatchlist] = useState([]);

  const handleAddToWatchlist = () => {
    let newWatchlistMediaObject = {
      movieId: parseInt(id),
      watchlistId: selectedWatchlistId,
    };
    console.log(newWatchlistMediaObject);
    newWatchlistMedia(newWatchlistMediaObject);
  };

  const handleCloseDialog = () => {
    setIsAlreadyInWatchlist(false);
  };

  const handleShowPlotClick = () => {
    setShowPlot(!showPlot);
  };
  const handleWatchlistSelection = (e) => {
    const selectedId = parseInt(e.target.value);
    const isInWatchlist = usersWatchlist.some(
      (wl) =>
        wl.id === selectedId && wl.watchlistMedia.some((wm) => wm.movieId == id)
    );

    setIsAlreadyInWatchlist(isInWatchlist);
    setSelectedWatchlistId(selectedId);
  };

  useEffect(() => {
    console.log("Fetching movie for id:", id);
    setOmdbMovie({});
    getMovieById(id).then((movie) => setMovie(movie));
  }, [id]);

  useEffect(() => {
    if (movie.imbdId) {
      searchForMovieDataByImbdId(movie.imbdId).then((data) =>
        setOmdbMovie(data)
      );
    }
  }, [movie]);
  return (
    <div className="movie-detials-outer-container">
      <div className="movie-details-container">
        <div className="img-and-info">
          <div className="img-and-ratings">
            <img className="movie-poster" src={omdbMovie?.Poster} />
            <div className="imdb-rating">
              <h3>{omdbMovie.imdbRating}</h3>{" "}
              <img src={ImdbLogo} className="imdb-logo" />
            </div>
          </div>

          <div className="right-of-photo">
            <div className="title">
              <div className="movie-title">
                <h1>{omdbMovie.Title}</h1>
              </div>
            </div>
            <div className="movies-actors">
              <div className="actors-subtitle">
                <h3>Actors</h3>{" "}
              </div>
              <div className="actors">{omdbMovie.Actors}</div>
            </div>
            <div className="movies-writers">
              <div className="writer-subtitle">
                <h3>Writers</h3>
              </div>
              <div className="writers">{omdbMovie.Writer}</div>
            </div>
            <div className="movie-plot">
              {showPlot ? (
                <div className="plot-container">{omdbMovie.Plot}</div>
              ) : (
                <button onClick={() => handleShowPlotClick()}>Show Plot</button>
              )}
            </div>
          </div>
        </div>
        <div className="bottom-of-details">
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button>Add To Watchlist</button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="add-to-watchlist-overlay" />
              <Dialog.Content className="add-to-watchlist-content">
                <Dialog.Title className="add-to-watchlist-title">
                  Add {omdbMovie.Title} to a Watchlist
                </Dialog.Title>
                <Dialog.Description className="add-to-watchlist-description">
                  Choose a watchlist
                </Dialog.Description>
                <select onChange={(event) => handleWatchlistSelection(event)}>
                  <option value="0">Choose A Watchlist</option>
                  {usersWatchlist?.map((wl) => (
                    <option value={wl.id} key={wl.id}>
                      {wl.title}
                    </option>
                  ))}
                </select>
                <div className="add-to-watchlist-buttons">
                  <Dialog.Close asChild>
                    <button onClick={() => handleAddToWatchlist()}>Add</button>
                  </Dialog.Close>
                  <Dialog.Close asChild>
                    <button onClick={() => handleCloseDialog()}>Close</button>
                  </Dialog.Close>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </div>
  );
};

import { Dialog, Form } from "radix-ui";
import "./MovieCard.css";
import { useEffect, useState } from "react";
import {
  getWatchlistsByUserId,
  getWatchlistsByUserIdWithMovieId,
} from "../../managers/watchlistManager";
import {
  deleteWatchlistMedia,
  newWatchlistMedia,
} from "../../managers/wathchlistMediaManager";

export const MovieCard = ({
  movie,
  usersWatchlist,
  loggedInUser,
  setUsersWatchlist,
}) => {
  useEffect(() => {
    console.log(movie);
  }, [movie]);
  useEffect(() => {
    if (!usersWatchlist || !movie?.id) return;

    const movieWatchlists = usersWatchlist?.reduce((acc, watchlist) => {
      watchlist.watchlistMedia.forEach((media) => {
        if (!acc[media.movieId]) {
          acc[media.movieId] = [];
        }
        acc[media.movieId].push(watchlist.id);
      });
      return acc;
    }, {});

    if (movieWatchlists[movie.id] && movieWatchlists[movie.id].length > 0) {
      setIsInWatchlist(true);
    }
  }, [usersWatchlist, movie.id]);

  const addToWatchlist = async () => {
    const watchlistMedia = {
      watchListId: watchlistSelectId,
      movieId: movieId,
    };
    await newWatchlistMedia(watchlistMedia);
    const userWatchlists = await getWatchlistsByUserId(loggedInUser.id);
    setUsersWatchlist(userWatchlists);

    const moviesWatchlist = await getWatchlistsByUserIdWithMovieId(
      loggedInUser.id,
      movie.id
    );
    setMoviesWatchlist(moviesWatchlist);
  };

  const [movieId, setMovieId] = useState(0);

  const [selectedWatchlistId, setSelectedWatchlistId] = useState(0);

  const [moviesWatchlist, setMoviesWatchlist] = useState([]);

  const [watchlistSelectId, setWatchlistSelectId] = useState(0);

  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    getWatchlistsByUserIdWithMovieId(loggedInUser.id, movie.id).then((data) =>
      setMoviesWatchlist(data)
    );
  }, [loggedInUser, movie]);

  const deleteWatchlistMediaHandler = async (watchlistId, movieId) => {
    await deleteWatchlistMedia(watchlistId, movieId);

    const userWatchlist = await getWatchlistsByUserId(
      loggedInUser.id,
      movie.id
    );
    setUsersWatchlist(userWatchlist);

    const movieWatchlist = await getWatchlistsByUserIdWithMovieId(
      loggedInUser.id,
      movie.id
    );
    setMoviesWatchlist(movieWatchlist);
    setIsInWatchlist(false);
  };

  return (
    <div className="movie-card-outer">
      <div className="movie-card-image">
        <img src={movie.Poster} />
      </div>
      <div className="add-to-watchlist">
        {isInWatchlist ? (
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="remove-from-watchlist-button">
                Remove from watchlist
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="remove-from-watchlist-overlay">
                <Dialog.Content className="remove-from-watchlist-content">
                  <Dialog.Title className="remove-from-watchlist-title">
                    Remove from Watchlist
                  </Dialog.Title>
                  <Dialog.Description className="remove-from-watchlist-description">
                    Remove this movie from the chosen watchlist.
                  </Dialog.Description>
                  <select
                    onChange={(event) =>
                      setSelectedWatchlistId(parseInt(event.target.value))
                    }
                  >
                    <option value="0">Choose Watchlist</option>
                    {moviesWatchlist?.map((mwl) => {
                      return (
                        <option value={mwl.id} key={mwl.id}>
                          {mwl.title}
                        </option>
                      );
                    })}
                  </select>
                  <Dialog.Close asChild>
                    <button
                      onClick={() =>
                        deleteWatchlistMediaHandler(
                          selectedWatchlistId,
                          movie.id
                        )
                      }
                    >
                      Remove
                    </button>
                  </Dialog.Close>
                  <Dialog.Close asChild>
                    <button>Cancel</button>
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Overlay>
            </Dialog.Portal>
          </Dialog.Root>
        ) : (
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button
                onClick={() => setMovieId(movie.id)}
                className="add-to-watchlist-button"
              >
                Add to Watchlist
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="add-to-watchlist-dialog-overlay" />
              <Dialog.Content className="add-to-watchlist-dialog-content">
                <Dialog.Title className="add-to-watchlist-dialog-title">
                  Add to Watchlist
                </Dialog.Title>
                <Dialog.Description className="add-to-watchlist-dialog-description">
                  Add this movie to your watchlist. Choose the watchlist and hit
                  add
                </Dialog.Description>
                <Form.Root>
                  <Form.Field className="add-to-watchlist-form">
                    <Form.Label className="add-to-watchlist-watchlist-select">
                      Add {movie.title} to
                    </Form.Label>
                    <Form.Control asChild>
                      <select
                        onChange={() =>
                          setWatchlistSelectId(parseInt(event.target.value))
                        }
                      >
                        <option value="0">Watchlists</option>
                        {usersWatchlist?.map((wl) => (
                          <option key={wl.id} value={wl.id}>
                            {wl.title}
                          </option>
                        ))}
                      </select>
                    </Form.Control>
                  </Form.Field>
                </Form.Root>
                <Dialog.Close asChild>
                  <button
                    className="add-to-watchlist-button"
                    onClick={() => addToWatchlist()}
                  >
                    Add to watchlist
                  </button>
                </Dialog.Close>
                <Dialog.Close asChild>
                  <button className="add-to-watchlist-cancel-button">
                    Cancel
                  </button>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        )}
      </div>
    </div>
  );
};

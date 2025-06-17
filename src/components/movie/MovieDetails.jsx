import { useEffect, useState } from "react";
import {
  getMovieById,
  searchForMovieDataByImbdId,
} from "../../managers/movieManager";
import { useParams } from "react-router-dom";
import ImdbLogo from "../../assets/IMDB-Logo.svg";
import "./MovieDetails.css";
import { Dialog, Separator, Tabs } from "radix-ui";
import {
  deleteWatchlistMedia,
  newWatchlistMedia,
} from "../../managers/wathchlistMediaManager";
import { getWatchlistsByUserId } from "../../managers/watchlistManager";
import MetaLogo from "../../assets/Metacritic-logo.png";
import { getMovieRatingsByMovieId } from "../../managers/movieRatingManager";

export const MovieDetails = ({
  usersWatchlist,
  setUsersWatchlist,
  loggedInUser,
}) => {
  const [omdbMovie, setOmdbMovie] = useState({});
  const [movie, setMovie] = useState({});
  const [showPlot, setShowPlot] = useState(false);
  const { id } = useParams();
  const [selectedWatchlistId, setSelectedWatchlistId] = useState(0);
  const [isAlreadyInWatchlist, setIsAlreadyInWatchlist] = useState(false);
  const [moviesWatchlist, setMoviesWatchlist] = useState([]);
  const [currentTab, setCurrentTab] = useState("tab1");
  const [movieRatings, setMovieRatings] = useState([]);
  const [movieAverageRating, setMovieAverageRating] = useState(0);

  const handleAddToWatchlist = () => {
    let newWatchlistMediaObject = {
      movieId: parseInt(id),
      watchlistId: selectedWatchlistId,
    };
    console.log(newWatchlistMediaObject);
    newWatchlistMedia(newWatchlistMediaObject).then(() => {
      getWatchlistsByUserId(loggedInUser.id).then((res) =>
        setUsersWatchlist(res)
      );
    });
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

  const handleRemovingFromWatchlist = () => {
    deleteWatchlistMedia(selectedWatchlistId, id).then(() => {
      setIsAlreadyInWatchlist(false);

      getWatchlistsByUserId(loggedInUser.id).then((res) =>
        setUsersWatchlist(res)
      );
    });
  };
  const getAverageRating = () => {
    let totalRatings = 0;
    movieRatings.forEach((mr) => {
      totalRatings += mr.rating;
    });
    console.log(totalRatings);
    let ratingCount = 0;
    movieRatings.forEach((mr) => {
      ratingCount += 1;
    });
    console.log(ratingCount);

    let average = totalRatings / ratingCount;
    console.log(average);
    setMovieAverageRating(average);
  };

  useEffect(() => {
    console.log("Fetching movie for id:", id);
    setOmdbMovie({});
    getMovieById(id).then((movie) => setMovie(movie));
  }, [id]);

  useEffect(() => {
    if (movie.id) {
      getMovieRatingsByMovieId(movie.id).then((res) => setMovieRatings(res));
    }
  }, [movie]);
  useEffect(() => {
    if (movieRatings) {
      getAverageRating();
    }
  }, [movieRatings]);

  useEffect(() => {
    if (movie.imbdId) {
      searchForMovieDataByImbdId(movie.imbdId).then((data) =>
        setOmdbMovie(data)
      );
    }
  }, [movie]);
  return (
    <div className="movie-details-container">
      <div className="left-side-of-movie-details">
        <img className="movie-image" src={omdbMovie.Poster} />
        <div className="ratings">
          <div className="detail-imdb-rating">
            {omdbMovie.imdbRating} <img className="imdbLogo" src={ImdbLogo} />
          </div>
          <div className="meta-critic-rating">
            {omdbMovie.Metascore} <img className="meta-logo" src={MetaLogo} />
          </div>
        </div>
      </div>
      <div className="right-side-of-movie-details">
        <div className="movie-header">
          <div className="movie-title">{omdbMovie.Title}</div>
          <div className="right-side-of-header">
            <span className="movie-year">{omdbMovie.Year}</span>
            <span className="by">by</span>
            <span className="movie-director">{omdbMovie.Director}</span>
          </div>
        </div>
        <div className="movie-details">
          <Tabs.Root
            value={currentTab}
            onValueChange={(value) => setCurrentTab(value)}
          >
            <Tabs.List className="tab-list">
              <Tabs.Trigger className="tab-trigger" value="tab1">
                Cast & Crew
              </Tabs.Trigger>
              <Tabs.Trigger className="tab-trigger" value="tab2">
                Production
              </Tabs.Trigger>
              <Tabs.Trigger className="tab-trigger" value="tab3">
                Plot
              </Tabs.Trigger>
              <Tabs.Trigger className="tab-trigger" value="tab4">
                Watchlist
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content className="TabsContent" value="tab1">
              <div className="cast-and-crew">
                <div className="director">
                  <span className="label">Director</span>
                  <span className="value">{omdbMovie.Director}</span>
                </div>
                <div className="writer">
                  <span className="label">Writer</span>
                  <span className="value">{omdbMovie.Writer}</span>
                </div>
                <div className="actors">
                  <span className="label">Actors</span>
                  <span className="value">{omdbMovie.Actors}</span>
                </div>
              </div>
            </Tabs.Content>
            <Tabs.Content className="TabsContent" value="tab2">
              <div className="production-info">
                <div className="release">
                  <span className="label">Released on</span>
                  <span className="value">{omdbMovie.Released}</span>
                </div>
                <div className="boxoffice">
                  <span className="label">Box Office</span>
                  <span className="value">{omdbMovie.BoxOffice}</span>
                </div>
                <div className="genre">
                  <span className="label">Genres</span>
                  <span className="value">{omdbMovie.Genre}</span>
                </div>
              </div>
            </Tabs.Content>
            <Tabs.Content className="TabsContent" value="tab3">
              <div className="plot">{omdbMovie.Plot}</div>
            </Tabs.Content>
            <Tabs.Content className="TabsContent" value="tab4">
              <div className="watchlist-container">
                <div className="watchlist-header">Add this to watchlist?</div>
                <div className="watchlist-selection">
                  <select
                    className="watchlist-select"
                    onChange={(event) => {
                      handleWatchlistSelection(event);
                    }}
                  >
                    <option value="0">Watchlist</option>
                    {usersWatchlist.map((wl) => (
                      <option key={wl.id} value={wl.id}>
                        {wl.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="watchlist-button">
                  {isAlreadyInWatchlist ? (
                    <button
                      className="button"
                      onClick={() => {
                        handleRemovingFromWatchlist();
                      }}
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      className="button"
                      onClick={() => {
                        handleAddToWatchlist();
                      }}
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </div>
  );
};

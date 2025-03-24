import { useEffect, useState } from "react";
import {
  deleteWatchList,
  getWatchlistById,
  getWatchlistsByUserId,
} from "../../managers/watchlistManager";
import { useNavigate } from "react-router-dom";
import "./WatchlistPage.css";
import { WatchlistCard } from "./WatchlistCard";
import { Popover } from "radix-ui";
import { searchForMovieDataByImbdId } from "../../managers/movieManager";

export const WatchlistPage = ({ loggedInUser }) => {
  const [allWatchLists, setAllWatchlists] = useState([]);
  const [selectedWatchlistId, setSelectedWatchlistId] = useState(0);
  const [watchlistMovie, setWatchlistMovie] = useState({});
  const [omdbMovieObjects, setOmdbMovieObjects] = useState([]);
  const [openStates, setOpenStates] = useState({});

  const navigate = useNavigate();

  const handleDelete = (id) => {
    deleteWatchList(id).then(() => {
      setAllWatchlists((prevLists) =>
        prevLists.filter((watchlist) => watchlist.id !== id)
      );
    });
  };

  useEffect(() => {
    const fetchWatchlistDetails = async () => {
      if (selectedWatchlistId) {
        try {
          // Fetch watchlist details
          const res = await getWatchlistById(selectedWatchlistId);
          setWatchlistMovie(res);

          if (res?.watchlistMedia?.length) {
            const movieObjects = await Promise.all(
              res.watchlistMedia.map(async (wlm) => {
                if (wlm?.movie?.imbdId) {
                  const omdbData = await searchForMovieDataByImbdId(
                    wlm.movie.imbdId
                  );

                  return {
                    ...omdbData,
                    movieId: wlm.movie.id,
                  };
                } else {
                  console.warn("Missing or invalid movie data:", wlm);
                  return null;
                }
              })
            );

            setOmdbMovieObjects(movieObjects.filter((obj) => obj !== null));
          } else {
            setOmdbMovieObjects([]);
          }
        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      }
    };

    fetchWatchlistDetails();
  }, [selectedWatchlistId]);

  const handleEdit = (id) => {
    navigate(`/watchlist/${id}/edit`);
  };
  useEffect(() => {
    getWatchlistsByUserId(loggedInUser.id).then((data) =>
      setAllWatchlists(data)
    );
  }, [loggedInUser]);

  const handleOpenChange = (id, open) => {
    setOpenStates((prev) => ({ ...prev, [id]: open }));

    if (open) {
      setSelectedWatchlistId(id);
    } else if (selectedWatchlistId === id) {
      setSelectedWatchlistId(null);
      setOmdbMovieObjects([]);
    }
  };

  return (
    <div className="my-watchlist-container">
      {allWatchLists.map((wl) => {
        const isOpen = openStates[wl.id] || false;
        return (
          <Popover.Root
            open={isOpen}
            key={wl.id}
            onOpenChange={(open) => handleOpenChange(wl.id, open)}
          >
            <Popover.Trigger asChild>
              <button className=" watchlist-card-wrapper">
                <WatchlistCard
                  key={wl.id}
                  watchlist={wl}
                  loggedInUser={loggedInUser}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              </button>
            </Popover.Trigger>

            <Popover.Portal>
              <Popover.Content className="watchlist-movie-content">
                <div className="watchlist-movie-content">
                  {omdbMovieObjects.map((m) => {
                    return (
                      <img
                        onClick={() => {
                          navigate(`/movie/${m.movieId}`);
                        }}
                        key={m.imdbID}
                        src={m.Poster}
                      />
                    );
                  })}
                </div>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        );
      })}
    </div>
  );
};

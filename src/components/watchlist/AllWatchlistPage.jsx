import { useEffect, useState } from "react";
import {
  deleteWatchList,
  getAllWatchlists,
  getWatchlistById,
} from "../../managers/watchlistManager";
import { useNavigate } from "react-router-dom";
import "./AllWatchlistPage.css";
import { WatchlistCard } from "./WatchlistCard";
import { Popover } from "radix-ui";
import { searchForMovieDataByImbdId } from "../../managers/movieManager";

export const AllWatchlistPage = ({ loggedInUser }) => {
  const [allWatchLists, setAllWatchlists] = useState([]);
  const [selectedWatchlistId, setSelectedWatchlistId] = useState(0);
  const [watchlistMovie, setWatchlistMovie] = useState({});
  const [isClosing, setIsClosing] = useState(false);
  const [omdbMovieObjects, setOmdbMovieObjects] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [openStates, setOpenStates] = useState({});

  const navigate = useNavigate();

  const handleDelete = (id) => {
    deleteWatchList(id).then(() => {
      getAllWatchlists().then((res) => setAllWatchlists(res));
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
                // Add safety checks for movie and imbdId
                if (wlm?.movie?.imbdId) {
                  // Fetch movie data from OMDB using the imbdId
                  const omdbData = await searchForMovieDataByImbdId(
                    wlm.movie.imbdId
                  );
                  // Combine movie data from OMDB with your database movie id
                  return {
                    ...omdbData, // OMDB data (e.g., imdbID, Poster)
                    movieId: wlm.movie.id, // Movie ID from your database
                  };
                } else {
                  console.warn("Missing or invalid movie data:", wlm);
                  return null; // Skip invalid entries
                }
              })
            );

            setOmdbMovieObjects(movieObjects.filter((obj) => obj !== null));
          } else {
            setOmdbMovieObjects([]); // Clear state if no movies exist
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
    getAllWatchlists().then((data) => setAllWatchlists(data));
  }, []);

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
    <div className="all-watchlist-container">
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

            {/* Popover.Content should be inside the Popover.Root */}
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

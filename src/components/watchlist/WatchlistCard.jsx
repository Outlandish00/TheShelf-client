import { useEffect, useState } from "react";
import "./WatchlistCard.css";
import { getWatchlistMediaById } from "../../managers/wathchlistMediaManager";
import { useNavigate } from "react-router-dom";

export const WatchlistCard = ({
  watchlist,
  loggedInUser,
  handleEdit,
  handleDelete,
}) => {
  const [watchlistMedia, setWatchlistMedia] = useState([]);
  useEffect(() => {
    getWatchlistMediaById(watchlist.id).then((res) => setWatchlistMedia(res));
  }, [watchlist]);
  const navigate = useNavigate();

  return (
    <div
      className="watchlist-card-outer"
      onClick={() => navigate(`/watchlist/${watchlist.id}`)}
    >
      <div className="watchlist-card-inner">
        <div className="watchlist-left">
          <div className="watchlist-card-title">{watchlist.title}</div>
          <div className="watchlist-movie-count">
            {watchlistMedia?.length} Movies
          </div>
        </div>
        {loggedInUser.id == watchlist.userId ? (
          <div className="buttons">
            <button
              className="watchlist-edit-button"
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(watchlist.id);
              }}
            >
              Edit
            </button>
            <button
              className="watchlist-delete-button"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(watchlist.id);
              }}
            >
              Delete
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

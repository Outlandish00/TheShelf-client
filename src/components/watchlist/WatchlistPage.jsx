import { useEffect, useState } from "react";
import {
  deleteWatchList,
  getWatchlistsByUserId,
} from "../../managers/watchlistManager";
import "./WatchlistPage.css";

import { useNavigate } from "react-router-dom";

export const WatchlistPage = ({ loggedInUser }) => {
  const [watchlists, setWatchlists] = useState([]);

  useEffect(() => {
    getWatchlistsByUserId(loggedInUser.id).then((data) => setWatchlists(data));
  }, [loggedInUser]);

  const navigate = useNavigate();
  const handleDelete = (id) => {
    deleteWatchList(id).then(() => {
      getWatchlistsByUserId(loggedInUser.id).then((res) => setWatchlists(res));
    });
  };

  const handleEdit = (id) => {
    navigate(`${id}/edit`);
  };

  return (
    <div className="watchlist-container">
      {watchlists.map((wl) => {
        return (
          <div key={wl.id} onClick={() => navigate(`${wl.id}`)}>
            <div>{wl.title}</div>
            <button
              className="watchlist-edit-button"
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(wl.id);
              }}
            >
              Edit
            </button>
            <button
              className="watchlist-delete-button"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(wl.id);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

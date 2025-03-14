import { useEffect, useState } from "react";
import {
  deleteWatchList,
  getWatchlistsByUserId,
} from "../../managers/watchlistManager";
import "./WatchlistPage.css";

import { useNavigate } from "react-router-dom";
import { WatchlistCard } from "./WatchlistCard";

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
          <WatchlistCard
            key={wl.id}
            watchlist={wl}
            loggedInUser={loggedInUser}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        );
      })}
    </div>
  );
};

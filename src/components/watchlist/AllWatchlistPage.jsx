import { useEffect, useState } from "react";
import {
  deleteWatchList,
  getAllWatchlists,
} from "../../managers/watchlistManager";
import { useNavigate } from "react-router-dom";
import "./AllWatchlistPage.css";
import { WatchlistCard } from "./WatchlistCard";

export const AllWatchlistPage = ({ loggedInUser }) => {
  const [allWatchLists, setAllWatchlists] = useState([]);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    deleteWatchList(id).then(() => {
      getAllWatchlists().then((res) => setAllWatchlists(res));
    });
  };

  const handleEdit = (id) => {
    navigate(`/watchlist/${id}/edit`);
  };
  useEffect(() => {
    getAllWatchlists().then((data) => setAllWatchlists(data));
  }, []);

  return (
    <div className="all-watchlist-container">
      {allWatchLists.map((wl) => {
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

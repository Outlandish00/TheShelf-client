import { useState } from "react";
import { useEffect } from "react";
import {
  deleteWatchList,
  getAllWatchlists,
} from "../../managers/watchlistManager";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {}, []);
  getAllWatchlists().then((data) => setAllWatchlists(data));
  return (
    <div className="watchlist-container">
      {allWatchLists.map((wl) => {
        return (
          <div key={wl.id} onClick={() => navigate(`/watchlist/${wl.id}`)}>
            <div>{wl.title}</div>
            {loggedInUser.id == wl.userId ? (
              <>
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
              </>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
};

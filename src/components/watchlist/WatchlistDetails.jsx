import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWatchlistById } from "../../managers/watchlistManager";
import { Card, CardTitle } from "reactstrap";

export const WatchlistDetails = () => {
  const { id } = useParams();
  const [currentWatchlist, setCurrentWatchlist] = useState({});

  useEffect(() => {
    getWatchlistById(id).then((res) => setCurrentWatchlist(res));
  }, [id]);
  return (
    <>
      <h1>{currentWatchlist.title}</h1>
      {currentWatchlist?.watchlistMedia?.map((mediaItem, index) => {
        return (
          <div key={mediaItem.id}>
            <img src={mediaItem.movie.posterLink} />
          </div>
        );
      })}
    </>
  );
};

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWatchlistById } from "../../managers/watchlistManager";
import { getWatchlistMediaById } from "../../managers/wathchlistMediaManager";

export const WatchlistDetails = () => {
  const { id } = useParams();
  const [currentWatchlist, setCurrentWatchlist] = useState({});
  const [watchlistMedia, setWatchlistMedia] = useState({});

  useEffect(() => {
    getWatchlistById(id).then((res) => setCurrentWatchlist(res));
  }, [id]);

  useEffect(() => {
    if (currentWatchlist.id) {
      getWatchlistMediaById(currentWatchlist.id).then((data) =>
        setWatchlistMedia(data)
      );
    }
  }, [currentWatchlist]);

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

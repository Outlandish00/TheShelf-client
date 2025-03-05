import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWatchlistById } from "../../managers/watchlistManager";
import { getWatchlistMediaById } from "../../managers/wathchlistMediaManager";
import {
  getMovieById,
  searchForMovieDataByImbdId,
} from "../../managers/movieManager";

export const WatchlistDetails = () => {
  const { id } = useParams();
  const [currentWatchlist, setCurrentWatchlist] = useState({});
  const [watchlistMedia, setWatchlistMedia] = useState({});
  const [watchlistMovieObjects, setWatchlistMoviebjects] = useState([]);

  useEffect(() => {
    getWatchlistById(id).then((res) => setCurrentWatchlist(res));
  }, [id]);

  const getMoviesDetails = async () => {
    let movieObjects = [];

    movieObjects = await Promise.all(
      watchlistMedia.map(async (m) => {
        const movie = await getMovieById(m.id);
        console.log(movie);
        return searchForMovieDataByImbdId(movie.imbdId);
      })
    );
    setWatchlistMoviebjects(movieObjects);
  };

  useEffect(() => {
    if (watchlistMedia.length > 0) {
      getMoviesDetails();
    }
  }, [watchlistMedia]);

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
      {watchlistMovieObjects?.map((mediaItem, index) => {
        return (
          <div key={mediaItem?.id}>
            <img src={mediaItem?.Poster} />
          </div>
        );
      })}
    </>
  );
};

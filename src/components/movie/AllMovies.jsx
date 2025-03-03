import { useEffect, useState } from "react";
import { getMovies } from "../../managers/movieManager";
import { MovieCard } from "./MovieCard";

export const AllMovies = ({
  usersWatchlist,
  loggedInUser,
  setUsersWatchlist,
}) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies().then((data) => setMovies(data));
  }, []);

  return (
    <div className="moviecard-container">
      {movies.map((m) => {
        return (
          <MovieCard
            key={m.id}
            usersWatchlist={usersWatchlist}
            movie={m}
            loggedInUser={loggedInUser}
            setUsersWatchlist={setUsersWatchlist}
          />
        );
      })}
    </div>
  );
};

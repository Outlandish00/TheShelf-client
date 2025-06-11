import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { Homepage } from "./homepage/Homepage";
import { AllMovies } from "./movie/AllMovies";
import { NewMovie } from "./movie/NewMovie";
import { WatchlistPage } from "./watchlist/WatchlistPage";
import { WatchlistDetails } from "./watchlist/WatchlistDetails";
import { NewWatchlistForm } from "./watchlist/NewWatchlistForm";
import { EditWatchlistForm } from "./watchlist/EditWatchlistForm";
import { useEffect, useState } from "react";
import { getWatchlistsByUserId } from "../managers/watchlistManager";
import { AllWatchlistPage } from "./watchlist/AllWatchlistPage";
import { MovieDetails } from "./movie/MovieDetails";
import { Profile } from "./profile/profile";

export default function ApplicationViews({
  loggedInUser,
  setLoggedInUser,
  searchedLetters,
}) {
  const [usersWatchlist, setUsersWatchlist] = useState([]);

  useEffect(() => {
    if (loggedInUser) {
      getWatchlistsByUserId(loggedInUser.id).then((res) =>
        setUsersWatchlist(res)
      );
    }
  }, [loggedInUser]);
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Homepage />
            </AuthorizedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Profile loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />
        <Route path="movie">
          <Route
            path="all"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <AllMovies
                  searchedLetters={searchedLetters}
                  loggedInUser={loggedInUser}
                  usersWatchlist={usersWatchlist}
                  setUsersWatchlist={setUsersWatchlist}
                />
              </AuthorizedRoute>
            }
          />

          <Route
            path="new"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <NewMovie loggedInUser={loggedInUser} />
              </AuthorizedRoute>
            }
          />
          <Route
            path=":id"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <MovieDetails
                  loggedInUser={loggedInUser}
                  setUsersWatchlist={setUsersWatchlist}
                  usersWatchlist={usersWatchlist}
                />
              </AuthorizedRoute>
            }
          />
        </Route>
        {/* <Route
          path="all-movies"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <AllMovies
                loggedInUser={loggedInUser}
                usersWatchlist={usersWatchlist}
                setUsersWatchlist={setUsersWatchlist}
              />
            </AuthorizedRoute>
          }
        />
        <Route
          path="new-movie"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <NewMovie loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        /> */}
        <Route path="watchlist">
          <Route
            index
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <WatchlistPage loggedInUser={loggedInUser} />
              </AuthorizedRoute>
            }
          />
          <Route
            path=":id"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <WatchlistDetails />
              </AuthorizedRoute>
            }
          />
          <Route
            path=":id/edit"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <EditWatchlistForm />
              </AuthorizedRoute>
            }
          />
          <Route
            path="new"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <NewWatchlistForm
                  setUsersWatchlist={setUsersWatchlist}
                  loggedInUser={loggedInUser}
                />
              </AuthorizedRoute>
            }
          />
          <Route
            path="all"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <AllWatchlistPage loggedInUser={loggedInUser} />
              </AuthorizedRoute>
            }
          />
        </Route>
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}

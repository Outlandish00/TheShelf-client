import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { Homepage } from "./homepage/Homepage";
import { AllMovies } from "./movie/AllMovies";
import { NewMovie } from "./movie/NewMovie";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
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
          path="all-movies"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <AllMovies />
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
        />
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

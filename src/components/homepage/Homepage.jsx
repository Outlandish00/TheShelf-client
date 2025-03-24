import { useEffect, useState } from "react";
import { getMovies } from "../../managers/movieManager";
import { MovieCard } from "../movie/MovieCard";
import "./Homepage.css";

export const Homepage = () => {
  return (
    <div className="homepage-container">
      <div className="the-shelf-header">The Shelf</div>
      <div className="the-shelf-body">
        Welcome to <span className="theShelf">The Shelf</span>, a movie
        collection site. This site allows you to search for movies based on
        their title and add them to the site, as well as create watchlist to
        have all your favorite movies in one place. To get started, just select
        a tab from the menu at the top.
      </div>
    </div>
  );
};

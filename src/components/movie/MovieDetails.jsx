import { useEffect, useState } from "react";
import {
  getMovieById,
  searchForMovieDataByImbdId,
} from "../../managers/movieManager";
import { useParams } from "react-router-dom";

export const MovieDetails = () => {
  const [omdbMovie, setOmdbMovie] = useState({});
  const [movie, setMovie] = useState({});
  const { id } = useParams();
  useEffect(() => {
    getMovieById(id).then((movie) => setMovie(movie));
  }, [id]);

  useEffect(() => {
    searchForMovieDataByImbdId(movie.imbdId).then((data) => setOmdbMovie(data));
  }, [movie]);
  return "This is the movie details page";
};

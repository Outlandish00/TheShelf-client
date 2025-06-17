const _apiUrl = "/api/movierating";

export const getMovieRatingsByMovieId = (movieId) => {
  return fetch(`${_apiUrl}/${movieId}`).then((res) => res.json());
};

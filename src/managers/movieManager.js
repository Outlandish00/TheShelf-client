const _apiUrl = "/api/movie";

export const getMovies = () => {
  return fetch(_apiUrl).then((res) => res.json());
};

export const searchForMovieDataByTitle = (title) => {
  const url = `${_apiUrl}/search/${title}`;
  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch movie data from the server");
      }
      return res.json();
    })
    .then((data) => {
      return data;
    });
};

export const searchForMovieDataByImbdId = (imdbId) => {
  const url = `${_apiUrl}/search/id=${imdbId}`;
  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Http Error! status: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
};

export const saveMovie = (movieObject) => {
  return fetch(_apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movieObject),
  });
};

export const getMovieById = (id) => {
  return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
};

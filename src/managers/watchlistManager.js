const _apiUrl = "/api/watchlist";

export const getWatchlistsByUserId = (userId) => {
  return fetch(`${_apiUrl}/userId=${userId}`).then((res) => res.json());
};

export const getWatchlistById = (watchlistId) => {
  return fetch(`${_apiUrl}/${watchlistId}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`failed to fetch watchlists: ${res.statusText}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error(`Error fetching watchlist:`, error);
      return [];
    });
};

export const postNewWatchlist = (newWatchlist) => {
  return fetch(`${_apiUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newWatchlist),
  });
};

export const deleteWatchList = (id) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: "DELETE",
  });
};

export const updateAWatchlist = (newWatchlist) => {
  console.log(newWatchlist);
  return fetch(`${_apiUrl}/${newWatchlist.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newWatchlist),
  });
};

export const getWatchlistsByUserIdWithMovieId = (userId, movieId) => {
  return fetch(`${_apiUrl}?userId=${userId}&movieId=${movieId}`).then((res) =>
    res.json()
  );
};

export const getAllWatchlists = () => {
  return fetch(`${_apiUrl}`).then((res) => res.json());
};

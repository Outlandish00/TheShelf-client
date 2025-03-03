const _apiUrl = "/api/watchlistmedia";

export const newWatchlistMedia = (watchlistMedia) => {
  return fetch(_apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(watchlistMedia),
  });
};

export const getWatchlistMediaById = (watchlistId) => {
  return fetch(`${_apiUrl}?watchlistId=${watchlistId}`).then((res) =>
    res.json()
  );
};

export const deleteWatchlistMedia = (watchlistId, movieId) => {
  return fetch(`${_apiUrl}?watchlistId=${watchlistId}&movieId=${movieId}`, {
    method: "DELETE",
  });
};

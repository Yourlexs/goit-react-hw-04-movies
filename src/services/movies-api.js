const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '25f132c346fd52b8e0ee706763b1a69a';

async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);

  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchMovies() {
  const movies = fetchWithErrorHandling(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`,
  );
  return movies;
}

export function fetchMovieByQuery(query) {
  return fetchWithErrorHandling(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`,
  );
}

export function fetchMovieDetails(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
  );
}

export function fetchMovieCredits(movieId) {
  const cast = fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
  );
  return cast;
}

export function fetchMovieReviews(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US`,
  );
}

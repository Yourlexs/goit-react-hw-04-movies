import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import * as moviesApi from '../services/movies-api';

export default function HomePage() {
  const [movies, setMoves] = useState([]);
  const { url } = useRouteMatch();

  useEffect(() => {
    moviesApi.fetchMovies().then(result => setMoves(result.results));
  }, []);

  return (
    <>
      <h1>Trending today</h1>
      {movies && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`${url}movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

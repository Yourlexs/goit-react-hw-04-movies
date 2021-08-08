import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';

import * as moviesApi from '../services/movies-api';

export default function HomePage() {
  const [movies, setMoves] = useState([]);
  const { url } = useRouteMatch();
  const location = useLocation();

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
              <Link
                to={{
                  pathname: `${url}movies/${movie.id}`,
                  state: {
                    from: {
                      location,
                      label: 'Go Back',
                    },
                  },
                }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

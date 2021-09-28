import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';

import * as moviesApi from '../services/movies-api';

import styles from './HomePage.module.css';

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
        <ul className={styles.moviesList}>
          {movies.map(movie => (
            <li key={movie.id} className={styles.movie}>
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
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className={styles.poster}
                />
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

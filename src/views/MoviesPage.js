import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';

import * as moviesApi from '../services/movies-api';
import Searchbar from '../components/Searchbar/Searchbar';

import styles from './MoviesPage.module.css';

export default function Moviespage() {
  const { url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  const queryParams = new URLSearchParams(location.search).get('query');
  const [searchQuery, setSearchQuery] = useState(queryParams || '');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    moviesApi
      .fetchMovieByQuery(searchQuery)
      .then(result => setMovies(result.results));

    history.push({
      pathname: location.pathname,
      search: `query=${searchQuery}`,
    });
  }, [searchQuery, history, location.pathname]);

  const changeSearchQuery = q => {
    if (searchQuery === q) {
      return;
    }
    setMovies([]);
    setSearchQuery(q);
  };

  return (
    <>
      <Searchbar onSubmit={changeSearchQuery} />
      <ul className={styles.moviesList}>
        {movies.map(movie => (
          <li key={movie.id} className={styles.movie}>
            <Link
              to={{
                pathname: `${url}/${movie.id}`,
                state: {
                  from: {
                    search: `query=${searchQuery}`,
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
    </>
  );
}

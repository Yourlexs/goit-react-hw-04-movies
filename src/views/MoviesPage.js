import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';

import * as moviesApi from '../services/movies-api';
import Searchbar from '../components/Searchbar/Searchbar';

// const MovieDetailsPage = lazy(() => import("./MovieDetailsPage.js"));

export default function Moviespage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const { url } = useRouteMatch();
  const location = useLocation();

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    moviesApi
      .fetchMovieByQuery(searchQuery)
      .then(result => setMovies(result.results));
  }, [searchQuery]);

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
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link
              to={{
                pathname: `${url}/${movie.id}`,
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
    </>
  );
}

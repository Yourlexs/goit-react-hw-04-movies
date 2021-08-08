import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';

import * as moviesApi from '../services/movies-api';
import Searchbar from '../components/Searchbar/Searchbar';

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

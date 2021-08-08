import { useState, useEffect, lazy, Suspense } from 'react';
import {
  NavLink,
  Route,
  useRouteMatch,
  useParams,
  useLocation,
  useHistory,
} from 'react-router-dom';

import styles from './MovieDetailsPage.module.css';

import * as moviesAPI from '../services/movies-api';

const Cast = lazy(() => import('./Cast.js'));
const Reviews = lazy(() => import('./Reviews.js'));

export default function MovieDetailsPage() {
  const { moviesId } = useParams();
  const { url, path } = useRouteMatch();
  const [movie, setMovie] = useState(null);

  const location = useLocation();
  const history = useHistory();

  const onGoBack = () => {
    history.push(location?.state?.from?.location ?? '/');
  };

  useEffect(() => {
    moviesAPI.fetchMovieDetails(moviesId).then(setMovie);
  }, [moviesId]);

  return (
    <>
      <button onClick={onGoBack}>
        {location?.state?.from?.label ?? 'Go back'}
      </button>
      {movie && (
        <>
          <div className={styles.movieDetails}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className={styles.poster}
            />
            <div>
              <h2>{movie.title}</h2>
              <p>User score: {movie.vote_average}</p>
              <h2>Overview</h2>
              <p>{movie.overview}</p>
              <h2>Genres</h2>
              <ul>
                {movie.genres.map(genre => (
                  <li key={genre.name}>{genre.name}</li>
                ))}
              </ul>
            </div>
          </div>

          <h3>Additional information</h3>

          <ul>
            <li>
              <NavLink
                to={`${url}/cast`}
                className={styles.link}
                activeClassName={styles.activeLink}
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`${url}/reviews`}
                className={styles.link}
                activeClassName={styles.activeLink}
              >
                Reviews
              </NavLink>
            </li>
          </ul>

          <Suspense fallback={<h2>Loading...</h2>}>
            <Route path={`${path}/cast`}>
              <Cast />
            </Route>
            <Route path={`${path}/reviews`}>
              <Reviews />
            </Route>
          </Suspense>
        </>
      )}
    </>
  );
}

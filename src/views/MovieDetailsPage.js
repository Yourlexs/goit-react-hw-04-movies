import { useState, useEffect, lazy, Suspense } from 'react';
import { NavLink, Route, useRouteMatch, useParams } from 'react-router-dom';

import * as moviesAPI from '../services/movies-api';

const Cast = lazy(() => import('./Cast.js'));
const Reviews = lazy(() => import('./Reviews.js'));

export default function MovieDetailsPage() {
  const { moviesId } = useParams();
  const { url, path } = useRouteMatch();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    moviesAPI.fetchMovieDetails(moviesId).then(setMovie);
  }, [moviesId]);

  return (
    <>
      <button>Go back</button>
      {movie && (
        <>
          <img src={movie.poster_path} alt={movie.title} />
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

          <h3>Additional information</h3>

          <ul>
            <li>
              <NavLink to={`${url}/cast`}>Cast</NavLink>
            </li>
            <li>
              <NavLink to={`${url}/reviews`}>Reviews</NavLink>
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

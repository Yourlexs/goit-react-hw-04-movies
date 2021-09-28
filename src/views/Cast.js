import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import * as moviesAPI from '../services/movies-api';

import styles from './Cast.module.css';

export default function Cast() {
  const { moviesId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    moviesAPI.fetchMovieCredits(moviesId).then(result => setCast(result.cast));
  }, [moviesId]);

  return (
    <>
      <ul className={styles.castList}>
        {cast &&
          cast.map(actor => (
            <li key={actor.id} className={styles.actor}>
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={actor.name}
                  className={styles.foto}
                />
              ) : (
                <img
                  src="https://www.placecage.com/200/300"
                  alt={actor.name}
                  className={styles.foto}
                />
              )}
              <p>{actor.name}</p>
            </li>
          ))}
      </ul>
    </>
  );
}

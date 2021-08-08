import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import * as moviesAPI from '../services/movies-api';

export default function Cast() {
  const { moviesId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    moviesAPI.fetchMovieCredits(moviesId).then(result => setCast(result.cast));
  }, [moviesId]);

  return (
    <>
      <ul>
        {cast &&
          cast.map(actor => (
            <li key={actor.id}>
              <img src={actor.profile_path} alt={actor.name} />
              <p>{actor.name}</p>
            </li>
          ))}
      </ul>
    </>
  );
}

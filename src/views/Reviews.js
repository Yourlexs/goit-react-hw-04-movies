import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import * as moviesAPI from '../services/movies-api';

export default function Reviews() {
  const { moviesId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    moviesAPI
      .fetchMovieReviews(moviesId)
      .then(result => setReviews(result.results));
  }, [moviesId]);

  return (
    <>
      {reviews &&
        reviews.map(review => (
          <div key={review.id}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </div>
        ))}

      {/* <p>We don't have any reviews for this movie</p> */}
    </>
  );
}

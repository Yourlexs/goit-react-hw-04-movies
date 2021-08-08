import { useState } from 'react';
import styles from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(query);
    setQuery('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.SearchForm}>
        <input
          className={styles.input}
          value={query}
          onChange={handleChange}
          type="text"
          autoComplete="on"
          autoFocus
          placeholder="Search movies"
        />

        <button type="submit" className={styles.SearchFormButton}>
          <span>Search</span>
        </button>
      </form>
    </>
  );
}

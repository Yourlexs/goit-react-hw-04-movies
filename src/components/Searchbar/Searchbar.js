import { useState } from 'react';

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
      <form onSubmit={handleSubmit}>
        <input
          value={query}
          onChange={handleChange}
          type="text"
          autoComplete="on"
          autoFocus
          placeholder="Search movies"
        />

        <button type="submit">
          <span>Search</span>
        </button>
      </form>
    </>
  );
}

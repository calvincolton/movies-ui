import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies([
      { id: 1, title: "Shawshank" },
      { id: 2, title: "Godfather" },
      { id: 3, title: "Jurassic P" },
    ]);
  }, []);

  return (
    <div className="movies row">
      <h2>Movies</h2>
      <ul>
        {movies.map(({ id, title }) => (
          <li key={id}>
            <Link to={`/movies/${id}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;

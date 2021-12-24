import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Movies = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("http://localhost:4000/v1/movies");
        setMovies(res.data.movies);
      } catch (e) {
        setError(new Error(e).message);
      }
    };
    setLoading(true);
    fetchMovies();
    setLoading(false);
  }, []);

  if (error) {
    return <div className="movies row">{error}</div>;
  }

  return (
    <div className="movies d-flex flex-column">
      <h2>Movies</h2>
      <div className="mt-2 mb-4 d-flex">
        <Link to="/movies/new">
          <button className="btn btn-primary">Add Movie</button>
        </Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul className="d-flex flex-column">
          {movies.map(({ id, title }) => (
            <li key={id}>
              <Link to={`/movies/${id}`}>{title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Movies;

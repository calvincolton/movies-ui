import React, { useState, useEffect } from "react";
import axios from "axios";

const GraphQL = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const payload = `
      {
        list {
          id
          title
          description
          runtime
          year
        }
      }
    `;
    const fetchMovies = async () => {
      try {
        const res = await axios.post(
          "http://localhost:4000/v1/graphql/list",
          payload
        );
        setMovies(res.data.data.list);
      } catch (err) {
        setError(new Error(err).message);
      }
    };
    setLoading(true);
    fetchMovies();
    setLoading(false);
  }, []);

  console.log({ error });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ul className="list-group">
        {movies.map((movie) => (
          <li key={movie.id} className="list-group-item">
            <b>{movie.title}</b>
            <br />
            <small>{`${movie.year} - ${movie.runtime}`}</small>
            <br />
            {movie.description.slice(0, 100)}...
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GraphQL;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/v1/genres`);
        setGenres(res.data.genres);
      } catch (e) {
        setError(new Error(e).message);
      }
    };
    setLoading(true);
    fetchGenres();
    setLoading(false);
  }, []);

  console.log({ genres });

  if (error) {
    return <div className="genre">{error}</div>;
  }

  return (
    <div className="genres">
      <h2>Genres</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <ul>
            {genres.map((genre) => (
              <li key={genre.id}>
                <Link to={`/genres/${genre.id}`}>{genre.genreName}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Genres;

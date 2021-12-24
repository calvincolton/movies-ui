import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const GenreDetails = () => {
  const { genreId } = useParams();
  const [genreDetails, setGenreDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movies = [] } = genreDetails;

  useEffect(() => {
    const fetchGenreMovies = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/v1/genres/${genreId}`
        );
        setGenreDetails(res.data.genre || { movies: [] });
      } catch (e) {
        setError(new Error(e).message);
      }
    };
    setLoading(true);
    fetchGenreMovies();
    setLoading(false);
  }, [genreId]);

  if (error) {
    return <div className="genre-details"></div>;
  }

  return (
    <div className="genre-details">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {/* <h2>{genreName}</h2> */}
          <div className="list-group">
            {movies.map((movie) => (
              <Link
                key={movie.id}
                to={`/movies/${movie.id}`}
                className="list-group-item list-group-item-action"
              >
                {movie.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GenreDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const [error, setError] = useState(null);
  const { title, description, mpaaRating } = movie;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/v1/movies/${movieId}`
        );
        setMovie(res.data.movie);
      } catch (e) {
        setError(new Error(e).message);
      }
    };

    setLoading(true);
    fetchMovieDetails();
    setLoading(false);
  }, [movieId]);

  if (error) {
    return <div className="movie-details">{error}</div>;
  }

  return (
    <div className="movie-details">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2>{title}</h2>
          <h5>{description}</h5>
          <div className="float-start">Rating: {mpaaRating}</div>
          <div className="float-end">
            {/* {genres.map((genre) => (
              <span key={genre} className="badge bg-secondary me-2">
                {genre}
              </span>
            ))} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/v1/movies/${id}`);
        setMovie(res.data.movie);
      } catch (e) {
        setError(new Error(e).message);
      }
    };

    setLoading(true);
    fetchMovieDetails();
    setLoading(false);
  }, [id]);

  if (error) {
    return <div className="movie-details">{error}</div>;
  }

  return (
    <div className="movie-details">
      {loading ? <div>Loading...</div> : <h2>{movie.title}</h2>}
    </div>
  );
};

export default MovieDetails;

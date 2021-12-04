import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(async () => {
    const res = await axios.get(`www.movies.com/api/movies/${id}`);
    setMovie(res);
  }, [id]);

  return (
    <div className="movie-details">
      <h2>{movie.title}</h2>
    </div>
  );
};

export default MovieDetails;

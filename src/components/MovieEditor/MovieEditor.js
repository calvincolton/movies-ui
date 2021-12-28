import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

const MovieEditor = ({ jwt }) => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [movie, setMovie] = useState({
    id: movieId || "",
    title: "",
    description: "",
    rating: 1,
    runtime: 0,
    releaseDate: "",
    mpaaRating: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!jwt.length) {
      navigate("/login");
    }
  }, []);

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

    if (movieId) {
      setLoading(true);
      fetchMovieDetails();
      setLoading(false);
    }
  }, [movieId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // without axios:
    // const data = new FormData(e.target);
    // const payload = Object.fromEntries(data.entries());
    // const requestOptions = {
    //   method: "POST",
    //   body: JSON.stringify(payload),
    // };
    // fetch("http://localhost:4000/v1/signin", requestOptions)
    //   .then((res) => res.json())
    //   .then((res) => setJwt(res.response))
    //   .catch((err) => setError(new Error(err).message));

    const createMovie = async () => {
      try {
        const res = await axios({
          method: "post",
          url: "http://localhost:4000/v1/movies",
          data: movie,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        });
        // const res = await axios.post(`http://localhost:4000/v1/movies`, movie);
        const newMovieId = res.data.id;
        navigate(`/movies/${newMovieId}`);
      } catch (e) {
        setError(new Error(e).message);
      }
    };
    const updateMovie = async () => {
      try {
        await axios.put(`http://localhost:4000/v1/movies/${movieId}`, movie);
        navigate(`/movies/${movieId}`);
      } catch (e) {
        setError(new Error(e).message);
      }
    };
    setLoading(true);
    if (movieId) {
      updateMovie();
    } else {
      createMovie();
    }
    setLoading(false);
  };

  if (error) {
    console.log(error);
    // return <div className="add-movie">An error occurred</div>;
  }

  return (
    <div className="add-movie">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="hidden"
            name="id"
            value={movie.id}
            onChange={handleChange}
          />
          <div className="mb-4">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              name="title"
              className="form-control"
              value={movie.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              name="description"
              className="form-control"
              value={movie.description}
              onChange={handleChange}
              rows={4}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="release-date" className="form-label">
              Release Date
            </label>
            <input
              name="release-date"
              className="form-control"
              type="date"
              value={movie.releaseDate}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="mpaaRating" className="form-label">
              MPAA Rating
            </label>
            <select
              name="mpaaRating"
              className="form-control"
              value={movie.mpaaRating}
              onChange={handleChange}
            >
              <option value="G">G</option>
              <option value="PG">PG</option>
              <option value="PG-13">PG-13</option>
              <option value="R">R</option>
              <option value="NC-17">NC-17</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="rating" className="form-label">
              Rating
            </label>
            <input
              name="rating"
              className="form-control"
              min={1}
              max={5}
              value={movie.rating}
              type="number"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="runtime" className="form-label">
              Run time (in minutes)
            </label>
            <input
              name="runtime"
              className="form-control"
              min={0}
              value={movie.runtime}
              type="number"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary float-right">
            Submit
          </button>
        </form>
      )}
      <div className="mt-3">
        <h2>JSONified data:</h2>
        <pre>{JSON.stringify(movie, null, 3)}</pre>
      </div>
    </div>
  );
};

MovieEditor.propTypes = {
  jwt: PropTypes.string,
};

export default MovieEditor;

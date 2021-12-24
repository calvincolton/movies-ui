import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Movies from "./components/Movies";
import MovieEditor from "./components/MovieEditor";
import MovieDetails from "./components/MovieDetails";
import Genres from "./components/Genres";
import GenreDetails from "./components/GenreDetails";
import Login from "./components/Login";
import Logout from "./components/Logout";
// import Admin from "./components/Admin";
import Footer from "./components/Footer";
import "./app.css";

const App = () => {
  const [jwt, setJwt] = useState("");

  return (
    <div className="app container">
      <BrowserRouter>
        <div className="d-flex justify-content-between">
          <h1 className="mt-3 text-center" onClick={() => setJwt("")}>
            Go Movies
          </h1>
          <div className="mt-4">
            {jwt.length > 0 ? (
              <Link to="/logout">Log out</Link>
            ) : (
              <Link to="/login">Log in</Link>
            )}
          </div>
        </div>
        <hr className="mb-3" />
        <div className="row">
          <div className="col-md-3">
            <Nav jwt={jwt} />
          </div>
          <div className="col-md-9">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/movies" element={<Movies />} />
              <Route exact path="/movies/new" element={<MovieEditor />} />
              <Route exact path="/movies/:movieId" element={<MovieDetails />} />
              <Route
                exact
                path="/movies/:movieId/edit"
                element={<MovieEditor />}
              />
              <Route exact path="/genres" element={<Genres />} />
              <Route exact path="/genres/:genreId" element={<GenreDetails />} />
              {/* <Route exact path="/admin" element={<Admin />} /> */}
              <Route exact path="/login" element={<Login setJwt={setJwt} />} />
              <Route
                exact
                path="/logout"
                element={<Logout logout={() => setJwt("")} />}
              />
              {/* <Route exact path="/login" element={<Login />} /> */}
            </Routes>
          </div>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;

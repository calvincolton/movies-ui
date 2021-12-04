import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Movies from "./components/Movies";
import MovieDetails from "./components/MovieDetails";
import Categories from "./components/Categories";
import Admin from "./components/Admin";
import Footer from "./components/Footer";
import "./app.css";

const App = () => {
  return (
    <div className="app container">
      <div className="row">
        <h1 className="mt-3 text-center">Go Movies</h1>
      </div>
      <hr className="mb-3" />
      <BrowserRouter>
        <div className="row">
          <div className="col-md-3">
            <Nav />
          </div>
          <div className="col-md-9">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/movies" element={<Movies />} />
              <Route exact path="/movies/:id" element={<MovieDetails />} />
              <Route
                exact
                path="/categories/:category"
                element={<Categories />}
              />
              <Route exact path="/admin" element={<Admin />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;

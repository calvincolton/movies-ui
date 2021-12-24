import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Nav = ({ jwt }) => {
  return (
    <nav>
      <ul className="list-group">
        <li className="list-group-item">
          <Link to="/">Home</Link>
        </li>
        <li className="list-group-item">
          <Link to="/movies">Movies</Link>
        </li>
        <li className="list-group-item">
          <Link to="/genres">Genres</Link>
        </li>
        {jwt.length > 0 && (
          <li className="list-group-item">
            <Link to="/admin">Manage Catalogue</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

Nav.propTypes = {
  jwt: PropTypes.string,
};

export default Nav;

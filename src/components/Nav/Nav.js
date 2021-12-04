import React, { useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [showCategories, setShowCategories] = useState(false);

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
          <div onClick={() => setShowCategories((prevState) => !prevState)}>
            Categories
          </div>
          {showCategories && (
            <ul>
              <li>
                <Link to="/categories/drama">Drama</Link>
              </li>
              <li>
                <Link to="/categories/comedy">Comedy</Link>
              </li>
            </ul>
          )}
        </li>
        <li className="list-group-item">
          <Link to="/admin">Manage Catalogue</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

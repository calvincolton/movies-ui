import React, { useEffect } from "react";
import PropTypes from "prop-types";

const Logout = ({ logout }) => {
  useEffect(() => {
    logout();
  }, []);

  return <div>See you soon!</div>;
};

Logout.propTypes = {
  logout: PropTypes.func,
};

export default Logout;

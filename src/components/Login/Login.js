import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const Login = ({ setJwt }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const requestOptions = {
    //   method: "POST",
    //   body: JSON.stringify(payload),
    // }
    try {
      const res = await axios.post("http://localhost:4000/v1/signin");
      console.log(res.data);
      setJwt("");
    } catch (err) {
      setError(new Error(err).message);
    }
  };

  console.log(credentials);
  // console.log(error);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          name="email"
          type="email"
          onChange={handleChange}
          value={credentials.email}
          className="form-control"
        />
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          name="password"
          type="password"
          onChange={handleChange}
          value={credentials.password}
          className="form-control"
        />
        {error && <div className="alert">{error}</div>}
        <button
          className="btn btn-primary mt-4 float-right"
          type="submit"
          onClick={() => console.log("login")}
        >
          Log in
        </button>
      </form>
      {/* <button className="btn btn-primary" onClick={() => setError("")}>
        set error
      </button> */}
    </div>
  );
};

Login.propTypes = {
  setJwt: PropTypes.func,
};

export default Login;

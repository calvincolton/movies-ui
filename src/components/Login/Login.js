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
    // NOTE: axios blocked by cors request for some reason
    try {
      const res = await axios.post(
        "http://localhost:4000/v1/signin",
        credentials
      );
      setJwt(res.data.response);
      // set the cookie
      const date = new Date();
      const expDays = 1;
      date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
      const expires = "expires=" + date.toUTCString();
      document.cookie = `jwt=${res.data.response}; ${expires}; path=/; SameSite=Strict; Secure;path=/; SameSite=Strict; Secure;`;
      // window.localStorage.setItem("jwt", res.data.response);
    } catch (err) {
      setError(new Error(err).message);
    }
  };

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
        <button className="btn btn-primary mt-4 float-right" type="submit">
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

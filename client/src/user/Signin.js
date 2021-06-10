import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
import { signin, isAutheticated, authenticate } from "./helper/userapicalls";

//import { signin, authenticate, isAuthenticated } from "../auth/helper";
function Signin(props) {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;

  const { user } = isAutheticated();

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading....</h2>
        </div>
      )
    );
  };
  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };
  const performRedirect = () => {
    <Redirect to="/user/dashboard" />;

    if (isAutheticated()) {
      return <Redirect to="/" />;
    }
  };
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const onSubmit = (event) => {
    try {
      event.preventDefault();
      setValues({ ...values, error: false, loading: true });
      signin({ email, password })
        .then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error, loading: false });
          } else {
            authenticate(data, () => {
              setValues({
                ...values,
                didRedirect: true,
              });
            });
          }
        })
        .catch(() => console.log("Error in signin"));
    } catch (err) {
      console.log(err);
    }
  };
  const signInForm = () => {
    return (
      <div className="row g-3">
        <div className="col-md-6 offset-md-3">
          <label className="form-label">Email</label>
          <input
            onChange={handleChange("email")}
            value={email}
            type="email"
            className="form-control"
            id="email"
            placeholder="Email GOES HERE"
          />
          <label className="form-label">Password</label>
          <input
            onChange={handleChange("password")}
            value={password}
            type="password"
            className="form-control"
            id="password"
            placeholder="write the password here"
          />
        </div>
        <div className="col-12 offset-md-3 ">
          <button
            onClick={onSubmit}
            type="submit"
            className="btn btn-primary btn-block"
          >
            Sign in
          </button>
        </div>
      </div>
    );
  };
  return (
    <Base title="sign in page">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
    </Base>
  );
}
export default Signin;

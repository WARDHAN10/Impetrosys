import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
const { API } = require("../backend");

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    error: "",
    success: false,
  });
  //FRONTEND TALK TO BACKEND
  const signup = (user) => {
    return fetch(`${API}signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  const { name, email, password, error, success, phone } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    try {
      event.preventDefault();
      setValues({ ...values, error: false });
      signup({ name, email, password, phone })
        .then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error, success: false });
          } else {
            setValues({
              ...values,
              name: "",
              email: "",
              password: "",
              error: "",
              phone: "",
              success: true,
            });
          }
        })
        .catch(() => console.log("Error in signup"));
    } catch (err) {
      console.log(err);
    }
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account is created Successfully.Please
            <Link to="/signin">LOGIN HERE</Link>
          </div>
        </div>
      </div>
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
            {" "}
            {error}
          </div>
        </div>
      </div>
    );
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Phone no</label>
              <input
                className="form-control"
                onChange={handleChange("phone")}
                type="number"
              />
            </div>

            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                className="form-control"
                type="password"
              />
            </div>
            <button type="submit" className="btn btn-success btn-block ">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign up page" description="A page for user to sign up!">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
    </Base>
  );
};

export default Signup;

import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { API } from "../backend";

import { Link } from "react-router-dom";

const AddProduct = () => {
  //front end talks to backend here

  //create product
  const createProduct = (userId, token, product) => {
    return fetch(`${API}product/create/${userId}`, {
      // mode: "no-cors",
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: product,
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
  };

  const getProduct = () => {
    return fetch(`${API}/product/all`, {
      method: "GET",
    })
      .then((res) => {
        return res.json;
      })
      .catch((err) => console.log(err));
  };

  //functions

  const [values, setValues] = useState({
    name: "",
    photo: "",
    loading: false,
    error: "",
    CreatedProduct: "",
    getaRedirect: false,
    formdata: "",
  });
  const {
    name,
    price,
    error,
    loading,
    CreatedProduct,
    getaRedirect,
    formData,
  } = values;

  const isAutheticated = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("jwt")) {
      return JSON.parse(localStorage.getItem("jwt"));
    } else {
      return false;
    }
  };
  const preload = () => {
    setValues({ ...values, formData: new FormData() });
  };

  useEffect(() => {
    preload();
  }, []);
  const { user, token } = isAutheticated();

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    const { user, token } = isAutheticated();

    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    console.log(token);
    createProduct(user._id, token, formData).then((data) => {
      console.log(data);
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          price: "",
          photo: "",
          loading: false,
          CreatedProduct: "rock",
        });
      }
    });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: CreatedProduct ? "" : "none" }}
    >
      {CreatedProduct} created successfully
    </div>
  );

  const warningMessage = () => (
    <div
      className="alert alert-danger mt-3"
      style={{ display: error ? "" : "none" }}
    >
      not able to create product
    </div>
  );
  const createProductForm = () => (
    <form>
      <div className="form-group mb-3">
        <label className="btn btn-block btn-success mt-3">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group  mb-3">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>

      <div className="form-group mb-3">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Create Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add a product here"
      desciption="welcome to product creation section"
      className="container bg-info p-4"
    >
      <Link className="btn btn-md btn-dark mb-3" to="/user/dashboard">
        User Home
      </Link>
      <div className="row bg-dark text-white ">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;

import React from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
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

const AdminDashboard = () => {
  const {
    user: { name, email, role },
  } = isAutheticated();

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Admin Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge bg-success mr-2">Name:</span> {name}
          </li>
          <li className="list-group-item">
            <span className="badge bg-success mr-2"> Email:</span> {email}
          </li>
          <li className="list-group-item">
            <span className="badge bg-danger mr-2"> user Area</span>
          </li>
        </ul>
      </div>
    );
  };

  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark tex-white">User navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/user/create/product" className="nav-link text-info">
              Create Product
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div>
      <Base
        title="Welcome to UserDashboard page"
        className="container bg-success p-4"
      >
        <div className="row">
          <div className="col-3"> {adminLeftSide()}</div>
          <div className="col-9"> {adminRightSide()}</div>
        </div>
      </Base>
    </div>
  );
};

export default AdminDashboard;

import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import ImageHelper from "./helper/ImageHelper";

function Card({ product }) {
  const cardTitle = product ? product.name : "No TITLE";
  const cardDescription = product ? product.description : "No description";
  const cardPrice = product ? product.price : "No Price";

  return (
    <div className="card text-white bg-dark border border-info">
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {cardDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
      </div>
    </div>
  );
}

export default Card;

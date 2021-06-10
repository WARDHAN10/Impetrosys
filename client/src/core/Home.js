import React, { useState, useEffect } from "react";
import { API } from "../backend";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";

function Home(props) {
  const getproducts = () => {
    return fetch(`${API}/products`, { method: "GET" })
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
  };

  const [Products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getproducts().then((data) => {
      if (data && data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };
  useEffect(() => {
    loadAllProducts();
  }, []);
  return (
    <Base title="HOMEPAGE">
      <div className="row">
        <h1 className="text-white">All the T-shirt</h1>
        <div className="row">
          {Products.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}

export default Home;

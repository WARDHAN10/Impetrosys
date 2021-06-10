import React from "react";
import Menu from "./Menu";

function Base({
  title = "My title",
  desciption = "My description",
  className = "bg-dark text-white p-4",
  children,
}) {
  return (
    <div>
      <Menu />
      <div className="caintainer_fluid">
        <div className="jumbotron bg-dark text-white text-center">
          <h1 className="dislpay-4 py-3">{title}</h1>
          <p className="lead">{desciption}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
    </div>
  );
}

export default Base;

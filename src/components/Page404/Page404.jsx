import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Page404 extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="text-center text-danger">PAGE 404</h1>
        <NavLink to="/">
          <button
            className="btn btn-primary mx-auto"
            style={{ display: "block" }}
          >
            HOME
          </button>
        </NavLink>
      </div>
    );
  }
}

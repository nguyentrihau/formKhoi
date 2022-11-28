import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";

export default class Nav extends Component {
  render() {
    return (
      <div>
        <Header />
        <Outlet />
        {/* <Footer /> */}
      </div>
    );
  }
}

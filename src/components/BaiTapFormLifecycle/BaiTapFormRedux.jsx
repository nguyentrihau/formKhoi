import React, { Component } from "react";
import FormUser from "./FormUser.jsx";
import TableUser from "./TableUser.jsx";

export default class BaiTapFormRedux extends Component {
  render() {
    return (
      <div className="container mt-5">
        <FormUser />
        <br></br>
        <TableUser />
      </div>
    );
  }
}

import React, { Component } from "react";
import ArgesLogo from "../../assets/ArgesLogo";
import "./Navbar.scss";

export default class Navbar extends Component {
  render() {
    return (
      <nav id="_641630">
        <div className="container">
          <div className="brand">
            <ArgesLogo />
            <h1>ARPS</h1>
          </div>
          <div className="links">
            <div className="link">Home</div>
            <div className="link">Active Directory</div>
            <div className="link active">Fileserver</div>
          </div>
          <div className="user">Administrator</div>
        </div>
      </nav>
    );
  }
}

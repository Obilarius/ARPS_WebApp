import React from "react";
import { NavLink } from "react-router-dom";
import ArgesLogo from "../../assets/ArgesLogo";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav id="_641630">
      <div className="container">
        <NavLink className="brand" to="/">
          <ArgesLogo />
          <h1>ARPS</h1>
        </NavLink>
        <div className="links">
          <NavLink className="link" to="/home">
            Home
          </NavLink>
          <NavLink className="link" to="/ad">
            Active Directory
          </NavLink>
          <NavLink className="link" to="/fileserver">
            Fileserver
          </NavLink>
        </div>
        <NavLink className="user" to="/user/admin">
          Administrator
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;

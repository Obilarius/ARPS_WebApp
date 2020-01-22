import React from "react";
import { NavLink } from "react-router-dom";
import ArgesLogo from "../../assets/ArgesLogo";
import "./Navbar.scss";

const Navbar = ({ user }) => {
  return (
    <nav id="_641630">
      <div className="container">
        <NavLink className="brand" to="/home">
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
          <NavLink className="link" to="/wss">
            Sharepoint
          </NavLink>
        </div>
        <div className="right">
          <NavLink className="user" to="/user">
            {user.cn}
            <div className="user-icon">
              <img src={user.thumbnailPhoto} alt="Profile" />
            </div>
          </NavLink>
          <div className="version">v0.1(beta)</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

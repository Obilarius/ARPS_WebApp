import React, { useState } from "react";
import LoginForm from "./LoginForm";

import "./Login.scss";
import Axios from "axios";
import { proxy } from "../../../vars";

const Login = props => {
  const onSubmit = (e, username, password) => {
    e.preventDefault();

    Axios.post(proxy + "/ldap/login", {
      serverUrl: "ldap://arges.local",
      domain: "arges",
      username,
      password
    })
      .then(function(response) {
        props.setUser(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <div id="_4cbe05">
      <div className="overlay"></div>
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
};

export default Login;

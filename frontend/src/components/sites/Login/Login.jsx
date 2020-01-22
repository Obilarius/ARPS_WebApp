import React, { useState } from "react";
import LoginForm from "./LoginForm";

import "./Login.scss";
import Axios from "axios";
import { proxy } from "../../../vars";

const Login = props => {
  const arrayBufferToBase64 = buffer => {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const onSubmit = (e, username, password) => {
    e.preventDefault();

    Axios.post(proxy + "/ldap/login", {
      serverUrl: "ldap://arges.local",
      domain: "arges",
      username,
      password
    })
      .then(function(response) {
        response.data.thumbnailPhoto =
          "data:image/png;base64," +
          arrayBufferToBase64(response.data.thumbnailPhoto.data);

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

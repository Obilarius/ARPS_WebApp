import React, { useState } from "react";
import ArgesLogo from "../../../assets/ArgesLogo";

const LoginForm = props => {
  const [username, setUsername] = useState("walzenbach");
  const [password, setPassword] = useState("Dosenfisch32!");

  const onChangeUsername = e => {
    setUsername(e.target.value);
  };
  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  const onSubmit = e => {
    props.onSubmit(e, username, password);
  };

  return (
    <form className="form-block" onSubmit={onSubmit}>
      <div className="header">
        <ArgesLogo />
        <span className="text">ARPS</span>
      </div>
      {props.errors.length > 0 && (
        <div className="errors">
          {props.errors.map((err, i) => (
            <div key={i} className="error">
              {err}
            </div>
          ))}
        </div>
      )}
      <div className="form-block__input-wrapper">
        <div className="form-group form-group--login">
          <input
            className="form-group__input"
            type="text"
            id="username"
            placeholder="Benutzername"
            value={username}
            onChange={onChangeUsername}
          />
          <input
            className="form-group__input"
            type="password"
            id="password"
            placeholder="Passwort"
            value={password}
            onChange={onChangePassword}
          />
        </div>
      </div>
      <button className="button button--primary full-width" type="submit">
        Log In
      </button>
    </form>
  );
};

export default LoginForm;

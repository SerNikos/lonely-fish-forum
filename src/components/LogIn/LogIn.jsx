import React from "react";
import "./LogIn.css";
import { useState } from "react";
import axios from "axios";

export default function LogIn() {
  const [loginInputValues, setLoginInputValues] = useState({
    username: "",
    password: "",
  });

  function handleInputChange(identifier, value) {
    setLoginInputValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
  }

  const handlePost = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5033/api/user/register", {
        username: loginInputValues.username,
        password: loginInputValues.password,
      })
      .then((res) => {
        console.log(res.username);
        console.log(res.password);
      })
      .catch((err) => {
        console.error("Error posting data:", err);
      });
  };

  return (
    <div className="login-container">
      <form action="">
        <h1>Log In</h1>
        <div className="ui divider"></div>

        <div className="field">
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            placeholder="Enter your username"
            id="username"
            value={loginInputValues.username}
            onChange={(event) =>
              handleInputChange("username", event.target.value)
            }
          />
        </div>

        <div className="field">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            value={loginInputValues.password}
            onChange={(event) =>
              handleInputChange("password", event.target.value)
            }
          />
        </div>

        <button className="submit-button" onClick={handlePost}>
          Log In
        </button>
      </form>
    </div>
  );
}

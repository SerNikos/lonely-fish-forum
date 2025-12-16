import React from "react";
import "./LogIn.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function LogIn() {
  const [loginInputValues, setLoginInputValues] = useState({
    username: "",
    password: "",
  });

  const [didEdit, setDidEdit] = useState({
    username: false,
    password: false,
  });

  const usernameIsInvalid =
    didEdit.username && !(loginInputValues.username.length > 2);

  function handleInputChange(identifier, value) {
    setLoginInputValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: false,
    }));
  }

  function handleInputBlur(identifier) {
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: true,
    }));
  }

const handlePost = (event) => {
  event.preventDefault();

  axios
    .post("http://localhost:5033/api/user/login", {
      username: loginInputValues.username,
      password: loginInputValues.password,
    })
    .then((res) => {
      console.log(res.data.username);
      console.log(res.data.password);
      alert(`You are now Logged In, ${res.data.username}`);
    })
    .catch((err) => {
      console.error("Error posting data:", err);
      alert("Login failed — check your username or password.");
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
            onBlur={() => handleInputBlur("username")}
            onChange={(event) =>
              handleInputChange("username", event.target.value)
            }
          />
          <div className="invalid-error">
            {usernameIsInvalid && (
              <p>Please enter a username longer than 2 characters</p>
            )}
          </div>
        </div>

        <div className="field">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            value={loginInputValues.password}
            onBlur={() => handleInputBlur("password")}
            onChange={(event) =>
              handleInputChange("password", event.target.value)
            }
          />
        </div>

        <button className="submit-button" onClick={handlePost}>
          Log In
        </button>

        You need Sign Up? {" "}  
         <Link to="/SignUp">
            Click here!
        </Link>
      </form>
    </div>
  );
}

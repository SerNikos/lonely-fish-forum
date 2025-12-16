import { useState } from "react";
import "./SignUp.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [inputValues, setInputValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [didEdit, setDidEdit] = useState({
    username: false,
    email: false,
    password: false,
  });

  // ---------- VALIDATION ----------
  const usernameIsInvalid =
    didEdit.username && inputValues.username.length < 3;

  const emailIsInvalid =
    didEdit.email &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(inputValues.email);

  const passwordIsInvalid =
    didEdit.password && inputValues.password.length < 4;

  // ---------- INPUT HANDLERS ----------
  function handleInputChange(identifier, value) {
    setInputValues((prevValues) => ({
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

  // ---------- SUBMIT ----------
  const handlePost = (event) => {
    event.preventDefault();

    if (usernameIsInvalid || emailIsInvalid || passwordIsInvalid) {
      return;
    }

    axios
      .post("http://localhost:5033/api/user/register", {
        username: inputValues.username,
        email: inputValues.email,
        password: inputValues.password,
      })
      .then((res) => {
        console.log(res.data.username);
        console.log(res.data.email);
        console.log(res.data.password);
        alert(`You are now Signed Up ${res.data.username}`);
      })
      .catch((err) => {
        console.error("Error posting data:", err);
      });
  };

  return (
    <div className="signup-container">
      <form>
        <h1>Sign Up</h1>
        <div className="ui divider"></div>

        {/* USERNAME */}
        <div className="field">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={inputValues.username}
            onChange={(e) =>
              handleInputChange("username", e.target.value)
            }
            onBlur={() => handleInputBlur("username")}
          />
          <div className="invalid-error">
            {usernameIsInvalid && (
              <p>Username must be at least 3 characters</p>
            )}
          </div>
        </div>

        {/* EMAIL */}
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Email"
            value={inputValues.email}
            onChange={(e) =>
              handleInputChange("email", e.target.value)
            }
            onBlur={() => handleInputBlur("email")}
          />
          <div className="invalid-error">
            {emailIsInvalid && <p>Please enter a valid email.</p>}
          </div>
        </div>

        {/* PASSWORD */}
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={inputValues.password}
            onChange={(e) =>
              handleInputChange("password", e.target.value)
            }
            onBlur={() => handleInputBlur("password")}
          />
          <div className="invalid-error">
            {passwordIsInvalid && (
              <p>Password must be at least 4 characters</p>
            )}
          </div>
        </div>

        <button className="submit-button" onClick={handlePost}>
          Submit
        </button>

        You wanna Log In?   
         <Link to="/LogIn">
            Click here!
        </Link>
      </form>
    </div>
  );
}

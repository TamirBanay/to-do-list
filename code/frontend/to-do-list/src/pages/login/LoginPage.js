import React from "react";
import { useEffect, useState } from "react";
import "./login.css";
import logInImag from "../../images/Done.png";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

import { _userIsLoggedIn, _currentUserId, _user } from "../../services/atom";
function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useRecoilState(_user);
  const [currentUserId, setCurrentUserId] = useRecoilState(_currentUserId);
  const [userIsLoggedIn, setUserIsLoggedIn] = useRecoilState(_userIsLoggedIn);
  const navigate = useNavigate();

  const moveToRegister = () => {
    window.location.href = "/register";
  };

  const loginHandler = () => {
    fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.payload));
        localStorage.setItem("userId", data.payload.id);

        setUserIsLoggedIn(true);
        setUser(data.payload);
        setCurrentUserId(data.payload.id);
        navigate(`/${data.payload.id}/home`);
      });
  };

  return (
    <div className="main-login">
      <div className="login-img">
        <img src={logInImag} />
      </div>
      <div className="login-title">
        Welcome back <br />
        to <br />
        <span className="secText"> OUR REMINDER</span>
      </div>
      <div className="inputs">
        <input
          onChange={(e) => setUsername(e.target.value)}
          className="login-email"
          type="email"
          placeholder="Enter your email"
        />
        <input
          className="login-password"
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="forgotPassword"> Forgot Password</div>
      <div className="signInButton-div">
        <button onClick={loginHandler} type="submit" className="signInButton">
          Sign In
        </button>
      </div>
      <div className="moveToRegister">
        Don’t have an account ?
        <span onClick={moveToRegister} className="secTextSignUp">
          {" "}
          Sign Up
        </span>
      </div>
    </div>
  );
}

export default LoginPage;

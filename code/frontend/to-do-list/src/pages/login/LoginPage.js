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
        setUserIsLoggedIn(true);
      });
    fetchUserData();
  };

  function fetchUserData() {
    // Retrieve the token from storage
    const token = localStorage.getItem("token");

    // If there's no token, the user isn't logged in or the token was cleared
    if (!token) {
      console.log("No token found. User might not be logged in.");
      return;
    }

    fetch("http://localhost:3000/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token, // Attach the token as a Bearer token
      },
    })
      .then((response) => {
        // Check if the request was successful
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to fetch user data");
      })
      .then((userData) => {
        console.log("User Data:", userData);
        // Do something with user data
        // Maybe update the UI to show user details
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }

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
          type="text"
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
        Don’t have an account ?<span className="secTextSignUp"> Sign Up</span>
      </div>
    </div>
  );
}

export default LoginPage;

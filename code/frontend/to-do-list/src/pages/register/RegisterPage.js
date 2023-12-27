import React from "react";
import logInImag from "../../images/Done.png";
import { useEffect, useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const moveToLogin = () => {
    window.location.href = "/login";
  };

  const registerHandler = () => {
    fetch("http://localhost:3000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        name: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate(`/login`);
      });
  };

  return (
    <div className="main-register">
      <div className="register-img">
        <img src={logInImag} />
      </div>
      <div className="register-title">
        Get’s things done <br />
        with TODO
      </div>

      <div className="helpTask-text">Let’s help you meet up your tasks</div>
      <div className="register-inputs">
        <input
          type="text"
          placeholder="Enter your full name"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="register-button-div">
        <button className="register-button" onClick={registerHandler}>
          Register
        </button>
      </div>
      <div className="moveToLogin">
        Already have an account ?
        <span onClick={moveToLogin} className="secTextSignUp">
          {" "}
          Sign In
        </span>
      </div>
    </div>
  );
}

export default RegisterPage;

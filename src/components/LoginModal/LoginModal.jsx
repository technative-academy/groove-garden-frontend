import style from "./LoginModal.module.css";

import React, { useState } from "react";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loginToggleActive } from "../../redux/uiState";
import { login } from "../../redux/user";

import closeButton from "../../assets/icons/close.svg";

function LoginModal() {
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.email.length > 0 && inputValue.password.length > 3) {
      const result = await dispatch(login(inputValue));
      if (result.meta.requestStatus === "fulfilled") {
        dispatch(loginToggleActive());
      }
    }
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.heading}>
          <h1 className={style.title}>Login</h1>
          <div
            className={style.closeContainer}
            onClick={() => {
              dispatch(loginToggleActive());
            }}
          >
            <img
              className={style.closeButton}
              src={closeButton}
              alt="button to close the login section"
            />
          </div>
        </div>
        <form className={style.form} action="" onSubmit={handleSubmit}>
          <label className={style.label}>Email:</label>
          <input
            className={style.input}
            placeholder="Enter your email"
            type="text"
            id="loginEmail"
            name="email"
            value={inputValue.email}
            onChange={handleInput}
            required
          />
          <label className={style.label}>Password:</label>
          <input
            className={style.input}
            placeholder="Enter your password"
            type="text"
            id="loginPassword"
            name="password"
            value={inputValue.password}
            onChange={handleInput}
            required
          />
          <button className={style.loginSubmit} type="submit">
            Login
          </button>
        </form>
        <div className={style.register}>
          <p className={style.registerText}>Don't have an account?</p>
          <NavLink
            to="/register"
            className={style.registerButton}
            onClick={() => {
              dispatch(loginToggleActive());
            }}
          >
            Register Now
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default LoginModal;

import style from "./Register.module.css";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, clearError } from "../../redux/user";

function Register() {
  const dispatch = useDispatch();

  const { status, error, isLoggedIn } = useSelector((state) => state.user);
  const [inputValue, setInputValue] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Clear error on mount
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.username || !inputValue.email || !inputValue.password) {
      alert("All fields are required.");
      return;
    }
    dispatch(register(inputValue));
  };

  const isLoading = status === "loading";

  return (
    <>
      <div className={style.wrapper}>
        <h1 className={style.heading}>Create an Account</h1>
        {isLoggedIn && (
          <p className={style.success}>Registration Successful!</p>
        )}
        {error && <p className={style.error}>{error}</p>}

        <form className={style.form} onSubmit={handleSubmit}>
          <label className={style.label}>Username</label>
          <input
            className={style.input}
            type="text"
            name="username"
            placeholder="Enter your username"
            value={inputValue.username}
            onChange={handleInput}
          />

          <label className={style.label}>Email</label>
          <input
            className={style.input}
            type="email"
            name="email"
            placeholder="Enter your email"
            value={inputValue.email}
            onChange={handleInput}
          />

          <label className={style.label}>Password</label>
          <input
            className={style.input}
            type="password"
            name="password"
            placeholder="Enter your password"
            value={inputValue.password}
            onChange={handleInput}
          />

          <button
            className={style.loginSubmit}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account…" : "Register"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;

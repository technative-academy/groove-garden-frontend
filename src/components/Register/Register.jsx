import style from "./Register.module.css";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/userRegister";

function Register() {
  const dispatch = useDispatch();

  const { isSuccess } = useSelector((state) => state.register);
  const [inputValue, setInputValue] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputValue);
    dispatch(registerUser(inputValue));
  };

  return (
    <>
      {isSuccess && <p>Sucessful</p>}
      <div>Register</div>
      <form className={style.form} action="" onSubmit={handleSubmit}>
        <label className={style.label}>Username:</label>
        <input
          className={style.input}
          placeholder="Enter your username"
          type="text"
          id="loginUsernameId"
          name="username"
          value={inputValue.username}
          onChange={handleInput}
          //   required
        />
        <label className={style.label}>Email:</label>
        <input
          className={style.input}
          placeholder="Enter your email"
          type="text"
          id="loginEmailId"
          name="email"
          value={inputValue.email}
          onChange={handleInput}
          //   required
        />
        <label className={style.label}>Password:</label>
        <input
          className={style.input}
          placeholder="Enter your password"
          type="text"
          id="loginPasswordId"
          name="password"
          value={inputValue.password}
          onChange={handleInput}
          //   required
        />
        <button className={style.loginSubmit} type="submit">
          Login
        </button>
      </form>
    </>
  );
}

export default Register;

import style from "./Create.module.css";

import React, { useState } from "react";
import { Navigate } from "react-router";
import { useDispatch } from "react-redux";
import { createToggleActive } from "../../../redux/uiState";

import closeButton from "../../../assets/icons/close.svg";
import authService from "../../services/authService";

export default function Create({ handleSubmit }) {
  const dispatch = useDispatch();
  const isLoggedIn = authService.isLoggedIn();

  const [inputValue, setInputValue] = useState({
    title: "",
    description: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      {isLoggedIn ? (
        <div className={style.container}>
          <div className={style.heading}>
            <h1 className={style.title}>Create Playlist</h1>
            <div
              className={style.closeContainer}
              onClick={() => {
                dispatch(createToggleActive());
              }}
            >
              <img
                className={style.closeButton}
                src={closeButton}
                alt="button to close the login section"
              />
            </div>
          </div>
          <form
            className={style.form}
            action=""
            onSubmit={(e) => handleSubmit(e, inputValue)}
          >
            <label className={style.label}>Title:</label>
            <input
              className={style.input}
              type="text"
              name="title"
              value={inputValue.title}
              onChange={handleInput}
              // required
            />

            <label className={style.label}>Description:</label>
            <input
              className={style.input}
              type="text"
              name="description"
              value={inputValue.description}
              onChange={handleInput}
              // required
            />
            <button className={style.loginSubmit} type="submit">
              Create Playlist
            </button>
          </form>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

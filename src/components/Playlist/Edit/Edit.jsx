import style from "./Edit.module.css";

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { editToggleActive } from "../../../redux/uiState";
import { getMyPlaylist, editMyPlaylist } from "../../../redux/playlist";

import closeButton from "../../../assets/icons/close.svg";
import apiService from "../../services/apiService";

export default function Edit({ playlistId }) {
  const [playlist, setPlaylist] = useState({
    created_by_user_id: "",
    title: "",
    description: "",
  });
  const [inputValue, setInputValue] = useState({
    created_by_user_id: "",
    title: "",
    description: "",
  });
  const dispatch = useDispatch();

  const getMyPlaylist = async (id) => {
    const response = await apiService(`api/playlists/${id}`);
    const data = {
      created_by_user_id: response.created_by_user_id,
      //   id: response.id,
      title: response.title,
      description: response.description,
    };
    setInputValue(data);
    setPlaylist(data);
  };

  useEffect(() => {
    getMyPlaylist(playlistId);
  }, [playlistId]);

  //   console.log(playlist);

  //   const userState = useSelector((state) => state.user);
  //   console.log(userState);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Skip if nothing changed
    if (
      inputValue.title !== playlist.title ||
      inputValue.description !== playlist.description
    ) {
      const result = await dispatch(
        editMyPlaylist({
          id: playlistId,
          title: inputValue.title,
          description: inputValue.description,
        })
      );

      if (result.meta.requestStatus === "fulfilled") {
        // Update local playlist state so inputs reflect latest
        setPlaylist({ ...playlist, ...inputValue });
      }
    }
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.heading}>
          <h1 className={style.title}>Edit Playlist</h1>
          <div
            className={style.closeContainer}
            onClick={() => {
              dispatch(editToggleActive());
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
          onSubmit={(e) => handleSubmit(e)}
        >
          <label className={style.label}>Created by User:</label>
          <input
            className={style.input}
            type="text"
            id="createdByUserId"
            name="created_by_user_id"
            value={inputValue.created_by_user_id}
            // onChange={handleInput}
            readOnly
          />
          <label className={style.label}>Title:</label>
          <input
            className={style.input}
            type="text"
            name="title"
            value={inputValue.title}
            onChange={handleInput}
            required
          />

          <label className={style.label}>Description:</label>
          <input
            className={style.input}
            type="text"
            name="description"
            value={inputValue.description}
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
              dispatch(editToggleActive());
            }}
          >
            Register Now
          </NavLink>
        </div>
      </div>
    </>
  );
}

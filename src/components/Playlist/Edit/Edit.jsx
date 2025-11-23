import style from "./Edit.module.css";

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { editToggleActive } from "../../../redux/uiState";
import {
  getMyPlaylist,
  getMyPlaylistById,
  editMyPlaylist,
} from "../../../redux/playlist";

import closeButton from "../../../assets/icons/close.svg";
import apiService from "../../services/apiService";

export default function Edit({ playlistId }) {
  const [playlist, setPlaylist] = useState({
    title: "",
    description: "",
  });
  const [inputValue, setInputValue] = useState({
    title: "",
    description: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const getMyPlaylist = async () => {
      const response = await dispatch(getMyPlaylistById(playlistId));
      const data = {
        title: response.payload.title,
        description: response.payload.description,
      };
      setInputValue(data);
      setPlaylist(data);
    };

    getMyPlaylist();
  }, [playlistId, dispatch]);

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
      dispatch(getMyPlaylist());
      dispatch(editToggleActive());
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
            Edit
          </button>
        </form>
      </div>
    </>
  );
}

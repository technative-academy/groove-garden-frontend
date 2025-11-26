import style from "./UploadSong.module.css";

import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { uploadSong } from "../../redux/song";
import { ToastContainer, toast } from "react-toastify";

import authService from "../services/authService";

function UploadSong() {
  const dispatch = useDispatch();
  const isLoggedIn = authService.isLoggedIn();
  const { error, status } = useSelector((state) => state.song);

  const [prevStatus, setPreviousStatus] = useState("idle");
  const [inputValue, setInputValue] = useState({
    songTitle: "",
    artistName: "",
    albumName: "",
    releaseDate: "",
    link: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputValue);
    dispatch(uploadSong(inputValue));
    setInputValue({
      songTitle: "",
      artistName: "",
      albumName: "",
      releaseDate: "",
      link: "",
    });
  };

  useEffect(() => {
    if (prevStatus === "loading") {
      if (status === "succeeded") {
        toast.success("Song uploaded Successfully");
      } else if (status === "failed") {
        toast.error(error);
      }
    }
    setPreviousStatus(status);
  }, [status, error, prevStatus]);

  return (
    <>
      {isLoggedIn ? (
        <>
          <ToastContainer />
          <section className={style.container}>
            <h1 className={style.heading}>Upload Song</h1>
            <form className={style.form} onSubmit={handleSubmit}>
              <label className={style.label}>Song Title:</label>
              <input
                className={style.input}
                type="text"
                id="songTitleId"
                name="songTitle"
                value={inputValue.songTitle}
                onChange={handleInput}
                required
              />

              <label className={style.label}>Artist Name:</label>
              <input
                className={style.input}
                type="text"
                id="artistNameId"
                name="artistName"
                value={inputValue.artistName}
                onChange={handleInput}
                required
              />

              <label className={style.label}>Album Name:</label>
              <input
                className={style.input}
                type="text"
                id="albumNameId"
                name="albumName"
                value={inputValue.albumName}
                onChange={handleInput}
              />

              <label className={style.label}>Release Date:</label>
              <input
                className={style.input}
                type="date"
                id="releaseDateId"
                name="releaseDate"
                value={inputValue.releaseDate}
                onChange={handleInput}
                required
              />

              <label className={style.label}>Link:</label>
              <input
                className={style.input}
                type="text"
                id="linkId"
                name="link"
                value={inputValue.link}
                onChange={handleInput}
              />

              <button className={style.button} type="submit">
                Upload Song
              </button>
            </form>
          </section>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default UploadSong;

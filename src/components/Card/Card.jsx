import style from "./Card.module.css";

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import authService from "../services/authService";

function Card({ song }) {
  const [songId, setSongId] = useState("");

  const dispatch = useDispatch();
  let currentUrl = useLocation().pathname;

  const isLoggedIn = authService.isLoggedIn();

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  //Get all my playlists
  const getAllPlaylists = async () => {
    console.log("button pressed");
  };

  useEffect(() => {
    // dispatch();
    setSongId(song.song_id);
  }, [setSongId, song.song_id]);

  const addToPlaylist = (id) => {
    console.log(id);
  };

  return (
    <>
      <div className={style.card} id={song.id}>
        <h1 className={style.cardName}>{song.song_name}</h1>
        {isLoggedIn && currentUrl === "/add-my-collections" && (
          <button
            onClick={() => {
              addToPlaylist({ songId });
            }}
          >
            Add to Collection
          </button>
        )}
        <ul className={style.listContainer}>
          <li className={style.listItem}>
            <p className={style.text}>
              <span className={style.textLabel}>Artist:</span>
              {song.artist_name}
            </p>
          </li>
          <li className={style.listItem}>
            <p className={style.text}>
              <span className={style.textLabel}>Album: </span> {song.album_name}
            </p>
          </li>
          <li className={style.listItem}>
            <p className={style.text}>
              <span className={style.textLabel}>Release Date: </span>
              {formatDate(song.release_date)}
            </p>
          </li>
          <li className={style.listItem}>
            <p className={style.text}>
              <a className={style.link} href={song.link}>
                Click here to listen
              </a>
            </p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Card;

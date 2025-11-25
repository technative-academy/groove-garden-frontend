import style from "./Card.module.css";

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import authService from "../services/authService";
import {
  addSongToMyPlaylist,
  getAllSongsInPlaylist,
} from "../../redux/playlist";
import { getSong, deleteMySong } from "../../redux/song";

function Card({ song }) {
  const [songId, setSongId] = useState("");

  const dispatch = useDispatch();
  let currentUrl = useLocation().pathname;

  const isLoggedIn = authService.isLoggedIn();

  const loggedInUser = useSelector((state) => state.user.user);
  const playlist_id = useSelector((state) => state.playlist.myPlaylistById?.id);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const addSongToPlaylist = async (songId) => {
    const result = await dispatch(addSongToMyPlaylist({ playlist_id, songId }));
    if (result.meta.requestStatus === "fulfilled") {
      dispatch(getAllSongsInPlaylist(playlist_id));
    }
  };

  const deleteSong = async () => {
    await dispatch(deleteMySong(songId));
    await dispatch(getSong());
  };

  useEffect(() => {
    setSongId(song.song_id);
  }, [song.song_id]);

  return (
    <>
      <div className={style.card} id={song.id}>
        <h1 className={style.cardName}>{song.song_name}</h1>
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
        {isLoggedIn && loggedInUser.id === song.posted_by_user_id ? (
          <button
            onClick={() => {
              deleteSong();
            }}
          >
            Remove Song
          </button>
        ) : null}
        {isLoggedIn && currentUrl === "/my-playlist-by-id/add-song" && (
          <button
            onClick={() => {
              addSongToPlaylist(songId);
            }}
          >
            Add to Playlist
          </button>
        )}
        {isLoggedIn && currentUrl === "/my-playlist-by-id" && (
          <button
            onClick={() => {
              deleteSong(playlist_id, songId);
            }}
          >
            Remove from Playlist
          </button>
        )}
      </div>
    </>
  );
}

export default Card;

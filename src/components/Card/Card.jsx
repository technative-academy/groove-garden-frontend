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

import deleteIcon from "../../assets/icons/delete.svg";
import addIcon from "../../assets/icons/add.svg";

function Card({ song, playlistDeleteSong }) {
  const dispatch = useDispatch();
  const [songId, setSongId] = useState("");

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
      <div className={style.container} id={song.id}>
        <div className={style.headingContainer}>
          <h1 className={style.cardName}>{song.song_name}</h1>
          <div className={style.imageContainer}>
            {isLoggedIn &&
            loggedInUser.id === song.posted_by_user_id &&
            currentUrl !== "/my-playlist-by-id/add-song" ? (
              <img
                className={style.icon}
                onClick={() => {
                  deleteSong();
                }}
                alt="delete icon"
                src={deleteIcon}
              />
            ) : null}
            {isLoggedIn && currentUrl === "/my-playlist-by-id/add-song" && (
              <img
                className={style.icon}
                onClick={() => {
                  addSongToPlaylist(songId);
                }}
                alt="Add to playlist icon"
                src={addIcon}
              />
            )}
            {isLoggedIn && currentUrl === "/my-playlist-by-id" && (
              <img
                className={style.icon}
                onClick={() => {
                  playlistDeleteSong(playlist_id, songId);
                }}
                alt="delete icon"
                src={deleteIcon}
              />
            )}
          </div>
        </div>
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

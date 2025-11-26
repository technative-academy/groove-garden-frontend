import style from "./Add.module.css";

import React, { useEffect } from "react";
import { Navigate, NavLink } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import Card from "../../Card/Card";
import authService from "../../services/authService";
import { getSong } from "../../../redux/song";

import backIcon from "../../../assets/icons/back.svg";

function AddPlaylist() {
  const dispatch = useDispatch();
  const isLoggedIn = authService.isLoggedIn();
  const songs = useSelector((state) => state.song.song);
  const songsAlreadyInPlaylist = useSelector(
    (state) => state.playlist.songsInPlaylist
  );

  useEffect(() => {
    dispatch(getSong());
  }, [dispatch]);

  const playlistSongIds = new Set(songsAlreadyInPlaylist.map((s) => s.song_id));

  const filterSongsAlreadyInPlaylist = songs.filter(
    (song) => !playlistSongIds.has(song.song_id)
  );

  return (
    <>
      {isLoggedIn ? (
        <div className={style.container}>
          <div className={style.header}>
            <NavLink className={style.headerLink} to="/my-playlist-by-id">
              <img className={style.headerImage} src={backIcon} alt="" />
            </NavLink>
            <h1 className={style.heading}>Add songs to playlist</h1>
          </div>
          <div>
            {filterSongsAlreadyInPlaylist?.map((song, index) => {
              return <Card key={index} song={song} />;
            })}
          </div>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default AddPlaylist;

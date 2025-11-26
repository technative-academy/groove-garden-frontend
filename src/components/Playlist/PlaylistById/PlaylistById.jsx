import style from "./PlaylistById.module.css";

import React, { useEffect } from "react";
import { Navigate, NavLink, Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteSongInPlaylist,
  getAllSongsInPlaylist,
} from "../../../redux/playlist";
import authService from "../../services/authService";

import Card from "../../Card/Card";

import back from "../../../assets/icons/back.svg";

export default function PlaylistById() {
  const dispatch = useDispatch();
  const isLoggedIn = authService.isLoggedIn();

  const playlistId = useSelector((state) => state.playlist.myPlaylistById);
  const songsInPlaylist = useSelector(
    (state) => state.playlist.songsInPlaylist
  );

  useEffect(() => {
    dispatch(getAllSongsInPlaylist(playlistId.id));
  }, [dispatch, playlistId.id]);

  const playlistDeleteSong = async (playlist_id, song) => {
    const result = await dispatch(
      deleteSongInPlaylist({ playlistId: playlist_id, songId: song })
    );
    if (result.meta.requestStatus === "fulfilled") {
      await dispatch(getAllSongsInPlaylist(playlistId.id));
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <Outlet />
          <div className={style.header}>
            <NavLink className={style.headerLink} to="/my-playlist">
              <img className={style.headerImage} src={back} alt="" />
            </NavLink>
            <h1 className={style.heading}>Playlist: {playlistId.title}</h1>
          </div>
          <div className={style.addSongContainer}>
            <NavLink className={style.buttonLink} to="add-song">
              <button className={style.button}>Add Song</button>
            </NavLink>
          </div>
          <div>
            {songsInPlaylist.map((song, index) => {
              return (
                <Card
                  key={index}
                  song={song}
                  playlistDeleteSong={playlistDeleteSong}
                />
              );
            })}
          </div>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

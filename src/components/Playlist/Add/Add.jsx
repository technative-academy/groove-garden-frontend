import style from "./Add.module.css";

import React from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";

import Card from "../../Card/Card";
import authService from "../../services/authService";

function AddPlaylist() {
  const isLoggedIn = authService.isLoggedIn();
  const songs = useSelector((state) => state.song.song);
  const songsAlreadyInPlaylist = useSelector(
    (state) => state.playlist.songsInPlaylist
  );

  const playlistSongIds = new Set(songsAlreadyInPlaylist.map((s) => s.song_id));

  const filterSongsAlreadyInPlaylist = songs.filter(
    (song) => !playlistSongIds.has(song.song_id)
  );

  return (
    <>
      {isLoggedIn ? (
        <div className={style.container}>
          <h1 className={style.heading}>Add songs to playlist</h1>
          {filterSongsAlreadyInPlaylist?.map((song, index) => {
            return <Card key={index} song={song} />;
          })}
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default AddPlaylist;

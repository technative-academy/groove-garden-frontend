import style from "./Add.module.css";

import React from "react";
import { useSelector } from "react-redux";

import Card from "../../Card/Card";

function AddPlaylist() {
  const songs = useSelector((state) => state.song.song);
  const songsAlreadyInPlaylist = useSelector(
    (state) => state.playlist.songsInPlaylist
  );

  const playlistSongIds = new Set(songsAlreadyInPlaylist.map((s) => s.song_id));

  const filterSongsAlreadyInPlaylist = songs.filter(
    (song) => !playlistSongIds.has(song.song_id)
  );

  return (
    <div className={style.container}>
      <h1 className={style.heading}>Add songs to playlist</h1>
      {filterSongsAlreadyInPlaylist?.map((song, index) => {
        return <Card key={index} song={song} />;
      })}
    </div>
  );
}

export default AddPlaylist;

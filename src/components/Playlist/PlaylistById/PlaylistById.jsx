import React, { useEffect } from "react";
import { NavLink, Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSongInPlaylist,
  getAllSongsInPlaylist,
  addSongToMyPlaylist,
} from "../../../redux/playlist";

import Card from "../../Card/Card";

export default function PlaylistById() {
  const dispatch = useDispatch();

  const playlistId = useSelector((state) => state.playlist.myPlaylistById);
  const songsInPlaylist = useSelector(
    (state) => state.playlist.songsInPlaylist
  );

  useEffect(() => {
    dispatch(getAllSongsInPlaylist(playlistId.id));
  }, [dispatch, playlistId.id]);

  const deleteSong = async (playlist_id, song) => {
    const result = await dispatch(
      deleteSongInPlaylist({ playlistId: playlist_id, songId: song })
    );
    if (result.meta.requestStatus === "fulfilled") {
      dispatch(getAllSongsInPlaylist(playlistId.id));
    }
  };

  return (
    <>
      <Outlet />
      <div>
        <h1>Playlist: {playlistId.title}</h1>
      </div>
      <div>
        <NavLink to="add-song">
          <button>Add Song</button>
        </NavLink>
      </div>
      <div>
        {songsInPlaylist?.map((song, index) => {
          return <Card key={index} song={song} deleteSong={deleteSong} />;
        })}
      </div>
    </>
  );
}

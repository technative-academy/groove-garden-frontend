import React, { useEffect } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Edit from "../Edit/Edit";

import authService from "../../services/authService";
import { getMyPlaylist, editMyPlaylist } from "../../../redux/playlist";
import { editToggleActive } from "../../../redux/uiState";

export default function MyPlaylist() {
  const dispatch = useDispatch();
  const isLoggedIn = authService.isLoggedIn();
  const myPlaylists = useSelector((state) => state.playlist.myPlaylist);
  const isEditModalOpen = useSelector((state) => state.ui.editActive);

  useEffect(() => {
    dispatch(getMyPlaylist());
  }, [dispatch]);

  const editPlaylist = (id) => {
    console.log(id);
    dispatch(editMyPlaylist(id));
  };

  const deletePlaylist = (id) => {
    console.log(id);
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <div>
            <h1>My Playlist</h1>
            <button>Create a Playlist</button>
          </div>
          <div>
            {myPlaylists.map((playlist, index) => {
              return (
                <>
                  {isEditModalOpen && <Edit playlistId={playlist.id} />}
                  <div key={index}>
                    <div>
                      <h1>{playlist.title}</h1>
                      <p>{playlist.description}</p>
                    </div>
                    <div>
                      <button onClick={() => dispatch(editToggleActive())}>
                        Edit
                      </button>
                      <button
                        id={playlist.id}
                        onClick={() => {
                          deletePlaylist(playlist.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
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

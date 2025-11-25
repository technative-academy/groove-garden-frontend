import React, { useEffect, useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Edit from "../Edit/Edit";
import Create from "../Create/Create";

import authService from "../../services/authService";
import {
  getMyPlaylist,
  deleteMyPlaylist,
  createNewPlaylist,
  getMyPlaylistById,
} from "../../../redux/playlist";
import { createToggleActive, editToggleActive } from "../../../redux/uiState";

export default function MyPlaylist() {
  const dispatch = useDispatch();
  const isLoggedIn = authService.isLoggedIn();
  const myPlaylists = useSelector((state) => state.playlist.myPlaylist);
  const isEditModalOpen = useSelector((state) => state.ui.editActive);
  const isCreateModalOpen = useSelector((state) => state.ui.createActive);

  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);

  useEffect(() => {
    dispatch(getMyPlaylist());
  }, [dispatch]);

  const handleSubmit = async (e, inputValue) => {
    e.preventDefault();
    await dispatch(createNewPlaylist(inputValue));
    await dispatch(createToggleActive());
    await dispatch(getMyPlaylist());
  };

  const deletePlaylist = async (id) => {
    await dispatch(deleteMyPlaylist(id));
    await dispatch(getMyPlaylist());
  };

  const getPlaylistById = async (id) => {
    await dispatch(getMyPlaylistById(id));
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <div>
            {isCreateModalOpen && <Create handleSubmit={handleSubmit} />}
            {isEditModalOpen && selectedPlaylistId && (
              <Edit playlistId={selectedPlaylistId} />
            )}
            <h1>My Playlist</h1>
            <button
              onClick={() => {
                dispatch(createToggleActive());
              }}
            >
              Create a Playlist
            </button>
          </div>
          <div>
            {myPlaylists.map((playlist, index) => {
              return (
                <div key={index}>
                  <div>
                    <h1>{playlist.title}</h1>
                    <p>{playlist.description}</p>
                  </div>
                  <div>
                    <NavLink to="/my-playlist-by-id">
                      <button
                        onClick={() => {
                          getPlaylistById(playlist.id);
                        }}
                      >
                        Open Playlist
                      </button>
                    </NavLink>
                    <button
                      onClick={() => {
                        setSelectedPlaylistId(playlist.id);
                        dispatch(editToggleActive());
                      }}
                    >
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

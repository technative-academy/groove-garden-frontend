import style from "./Playlist.module.css";

import React, { useEffect, useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Edit from "../Edit/Edit";
import Create from "../Create/Create";

import editIcon from "../../../assets/icons/edit.svg";
import deleteIcon from "../../../assets/icons/delete.svg";

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
        <div className={style.container}>
          <div className={style.header}>
            {isCreateModalOpen && <Create handleSubmit={handleSubmit} />}
            {isEditModalOpen && selectedPlaylistId && (
              <Edit playlistId={selectedPlaylistId} />
            )}
            <h1 className={style.heading}>My Playlist</h1>
            <button
              onClick={() => {
                dispatch(createToggleActive());
              }}
              className={style.button}
            >
              Create a Playlist
            </button>
          </div>
          <div>
            {myPlaylists.map((playlist, index) => {
              return (
                <div className={style.card} key={index}>
                  <div className={style.cardHeader}>
                    <h1 className={style.title}>{playlist.title}</h1>
                    <p className={style.description}>{playlist.description}</p>
                  </div>
                  <div className={style.functions}>
                    <div className={style.buttonContainer}>
                      <NavLink to="/my-playlist-by-id">
                        <button
                          onClick={() => {
                            getPlaylistById(playlist.id);
                          }}
                          className={style.button}
                        >
                          Open Playlist
                        </button>
                      </NavLink>
                    </div>
                    <div className={style.iconContainer}>
                      <img
                        onClick={() => {
                          setSelectedPlaylistId(playlist.id);
                          dispatch(editToggleActive());
                        }}
                        className={style.icon}
                        alt="edit"
                        src={editIcon}
                      />

                      <img
                        onClick={() => {
                          setSelectedPlaylistId(playlist.id);
                          deletePlaylist(playlist.id);
                        }}
                        className={style.icon}
                        alt="delete"
                        src={deleteIcon}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

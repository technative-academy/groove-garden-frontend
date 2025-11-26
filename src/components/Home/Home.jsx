import style from "./Home.module.css";
import Card from "../Card/Card";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { getSong } from "../../redux/song";

function Home() {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.song.song);
  const { searchTerm } = useOutletContext() || { searchTerm: '' }; // Add default value

  useEffect(() => {
    dispatch(getSong());
  }, [dispatch]);

  // Filter songs based on search term
  const filteredSongs = songs?.filter(song => {
    if (!searchTerm || searchTerm.trim() === '') return true; // Show all if no search term
    
    const searchLower = searchTerm.toLowerCase();
    return (
      song.song_name?.toLowerCase().includes(searchLower) ||
      song.artist_name?.toLowerCase().includes(searchLower) ||
      song.album_name?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className={style.container}>
      {filteredSongs?.map((song, index) => {
        return <Card key={index} song={song} />;
      })}
    </div>
  );
}

export default Home;
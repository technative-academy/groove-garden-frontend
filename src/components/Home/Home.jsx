import style from "./Home.module.css";
import Card from "../Card/Card";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSong } from "../../redux/song";

function Home() {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.song.song);

  useEffect(() => {
    dispatch(getSong());
  }, [dispatch]);

  return (
    <div className={style.container}>
      {songs?.map((song, index) => {
        return <Card key={index} song={song} />;
      })}
    </div>
  );
}

export default Home;

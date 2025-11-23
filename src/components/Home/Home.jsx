import style from "./Home.module.css";
import Card from "../Card/Card";

import React from "react";
import { useSelector } from "react-redux";

function Home() {
  const songs = useSelector((state) => state.song.song);
  return (
    <div className={style.container}>
      {songs?.map((song, index) => {
        return <Card key={index} song={song} />;
      })}
    </div>
  );
}

export default Home;

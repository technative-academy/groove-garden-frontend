import style from "./Home.module.css";
import Card from "../Card/Card";

import React from "react";
import { useSelector } from "react-redux";

function Home() {
  const allSongs = useSelector((state) => state.allSongs.allSongsData);
  return (
    <div className={style.container}>
      {allSongs.map((song, index) => {
        return <Card key={index} song={song} />;
      })}
    </div>
  );
}

export default Home;

import style from "./Home.module.css";
import Card from "../Card/Card";

import React from "react";
import { useSelector } from "react-redux";

function Home() {
  const allSongs = useSelector((state) => state.allSongs.allSongs);
  return (
    <div className={style.container}>
      {allSongs?.map((song) => {
        return <Card key={song.id} song={song} />;
      })}
    </div>
  );
}

export default Home;

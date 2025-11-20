import React from "react";
import { useSelector } from "react-redux";

import Card from "../../Card/Card";

function AddPlaylist() {
  const allSongs = useSelector((state) => state.allSongs.allSongsData);

  return (
    <>
      <h1>Add Playlist</h1>
      {allSongs?.map((song, index) => {
        return <Card key={index} song={song} />;
      })}
    </>
  );
}

export default AddPlaylist;

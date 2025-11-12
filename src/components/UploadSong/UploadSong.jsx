import style from "./UploadSong.module.css";

import React from "react";

function UploadSong() {
  return (
    <section className={style.container}>
      <h1 className={style.heading}>Upload Song</h1>
      <form className={style.form} action="">
        <label className={style.label} htmlFor="songTitle">
          Song Title:
        </label>
        <input
          className={style.input}
          type="text"
          id="songTitle"
          name="songTitle"
          required
        />

        <label className={style.label} htmlFor="artistName">
          Artist Name:
        </label>
        <input
          className={style.input}
          type="text"
          id="artistName"
          name="artistName"
          required
        />

        <label className={style.label} htmlFor="albumName">
          Album Name:
        </label>
        <input
          className={style.input}
          type="text"
          id="albumName"
          name="albumName"
        />

        <label className={style.label} htmlFor="genre">
          Genre:
        </label>
        <input className={style.input} type="text" id="genre" name="genre" />

        <label className={style.label} htmlFor="releaseDate">
          Release Date:
        </label>
        <input
          className={style.input}
          type="date"
          id="releaseDate"
          name="releaseDate"
          required
        />
        <button className={style.button} type="submit">
          Upload Song
        </button>
      </form>
    </section>
  );
}

export default UploadSong;

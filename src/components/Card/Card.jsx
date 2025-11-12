import style from "./Card.module.css";

import React from "react";

function Card({ song }) {
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  return (
    <>
      <div className={style.card}>
        <h1 className={style.cardName}>{song.song_name}</h1>
        <ul className={style.listContainer}>
          <li className={style.listItem}>
            <p className={style.text}>
              <span className={style.textLabel}>Artist:</span>
              {song.artist_name}
            </p>
          </li>
          <li className={style.listItem}>
            <p className={style.text}>
              <span className={style.textLabel}>Album: </span> {song.album_name}
            </p>
          </li>
          <li className={style.listItem}>
            <p className={style.text}>
              <span className={style.textLabel}>Release Date: </span>
              {formatDate(song.release_date)}
            </p>
          </li>
          <li className={style.listItem}>
            <p className={style.text}>
              <a className={style.link} href={song.link}>
                Click here to listen
              </a>
            </p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Card;

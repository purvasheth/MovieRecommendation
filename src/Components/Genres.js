import React, { useEffect, useState } from "react";
import Movies from "./Movies.js";
import "../styles.css";

export default function Genres() {
  const [genres, setGenres] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const key = "69ebdff6290b5b620445d123a10f023d";
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setGenres(json.genres));
  }, []);

  return (
    <div>
      <ul>
        {genres.map((genre) => (
          <li key={genre.id}>
            <button
              id={genre.id}
              className={
                active !== genre.id ? "regular-btn" : "regular-btn active-btn"
              }
              onClick={() => {
                setActive(genre.id);
              }}
            >
              {genre.name}
            </button>
          </li>
        ))}
      </ul>
      <Movies active={active} />
    </div>
  );
}

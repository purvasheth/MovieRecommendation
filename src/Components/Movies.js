import React, { useEffect, useState } from "react";
import "../styles.css";
import MovieCard from "./MovieCard";

export default function Movies({ active }) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const key = "69ebdff6290b5b620445d123a10f023d";
    const page = Math.floor(Math.random() * (500 - 1) + 1);
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&include_adult=false&with_genres=${active}&page=${page}&sort_by=popularity.asc`;

    fetch(url)
      .then((response) => response.json())
      .then((json) => setMovies(json.results));
  }, [active]);
  return (
    active !== 0 && (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          maxWidth: "800px",
          margin: "auto",
          justifyContent: "center"
        }}
      >
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movieTitle={movie.title}
            movieOverview={movie.overview}
          />
        ))}
      </div>
    )
  );
}

import React, { useEffect, useState } from "react";
import "../styles.css";
import { rt } from "../images/urls";
import { meta } from "../images/urls";
import { imdb, defaultPoster } from "../images/urls";

export default function MovieCard({ movieTitle, movieOverview }) {
  const [movie, setMovie] = useState({});
  useEffect(() => {
    const encodedMovieTitle = encodeURI(movieTitle, movieOverview);
    const key = "b604c6a8";
    const url = `https://www.omdbapi.com/?t=${encodedMovieTitle}&apikey=${key}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setMovie(json))
      .catch((err) => console.log(err));
  }, [movieTitle]);

  const parseRatingSource = (source, value) => {
    if (source === "Internet Movie Database") {
      return (
        <>
          <img
            src={imdb}
            alt="IMDb"
            height="50px"
            style={{
              marginRight: "10px"
            }}
          />

          {value}
        </>
      );
    }
    if (source === "Metacritic") {
      return (
        <>
          <img
            src={meta}
            alt="Metacritic"
            height="50px"
            style={{
              marginRight: "10px"
            }}
          />
          {value}
        </>
      );
    }
    if (source === "Rotten Tomatoes") {
      return (
        <>
          <img
            src={rt}
            alt="Rotten Tomatoes"
            height="50px"
            style={{
              marginRight: "10px"
            }}
          />
          {value}
        </>
      );
    }
    return source;
  };

  return movie.Ratings && movie.Ratings.length !== 0 ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        margin: "10px",
        maxWidth: "380px"
      }}
    >
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid  lightgrey",
          paddingLeft: "10px",
          justifyContent: "space-between"
        }}
      >
        <div
          style={{
            marginRight: "10px"
          }}
        >
          <h3>{movie.Title}</h3>
          <small
            style={{
              color: "grey"
            }}
          >
            {movie.Year} | {movie.Runtime}
          </small>
        </div>
        <img
          src={movie.Poster === "N/A" ? defaultPoster : movie.Poster}
          height="150px"
          alt="Poster"
        />
      </div>
      <div
        style={{
          display: "flex",
          padding: "10px",
          justifyContent: "center"
        }}
      >
        {/* {movie.Ratings && */}
        {movie.Ratings.map((rating, index) => (
          <div
            key={rating.Source}
            style={{
              borderRight:
                index !== movie.Ratings.length - 1 && "1px solid lightgrey",
              display: "flex",
              width: "max-content",
              alignItems: "center",
              padding: "10px"
            }}
          >
            {parseRatingSource(rating.Source, rating.Value)}
          </div>
        ))}
      </div>
      <div
        style={{
          padding: "10px",
          borderTop: "1px solid lightgrey"
        }}
      >
        {movieOverview ? movieOverview : movie.Plot}
      </div>
    </div>
  ) : null;
}

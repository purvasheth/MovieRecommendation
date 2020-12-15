import React from "react";
import "./styles.css";
import Genres from "./Components/Genres";

export default function App() {
  return (
    <div className="App">
      <h1>Movie Recommender</h1>
      <p> Select a genre to get started</p>
      <Genres />
    </div>
  );
}

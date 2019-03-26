import React from "react";
import { StoriesList } from "./StoriesList";

const sizes = {
  S: "s",
  M: "m",
  L: "l"
};

export const GameScreen = ({ onClick, stories, currentStory, vote }) => (
  <>
    <h1>Game screen</h1>
    <div>Current story: {currentStory.text}</div>
    <>
      {Object.values(sizes).map(size => (
        <button key={size} onClick={() => vote(size)}>{size}</button>
      ))}
    </>
    <StoriesList stories={stories} />
    <button onClick={onClick}>Switch state</button>
  </>
);

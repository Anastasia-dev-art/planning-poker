import React from "react";
import { StoriesList } from "./StoriesList";

const sizes = {
  S: "s",
  M: "m",
  L: "l"
};

export const GameScreen = ({ stories, currentStory, vote }) => (
  <>
    <h1>Game screen</h1>
    {
        currentStory && <div>Current story: {currentStory.text}</div>
    }
    <>
      {Object.values(sizes).map(size => (
        <button key={size} onClick={() => vote(size, currentStory.text)}>{size}</button>
      ))}
    </>
    <StoriesList stories={stories} />
  </>
);

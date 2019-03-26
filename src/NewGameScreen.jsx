import React, { useCallback, useState } from "react";
import {StoriesList} from './StoriesList'

export const NewGameScreen = ({ stories, onClick, startGame }) => {
  const [storyText, setStoryText] = useState("");

  const handleClick = useCallback(() => {
    onClick(storyText);
    setStoryText('')
  }, [storyText]);

  return (
    <>
      <h1>New Game</h1>
      <input
        type="text"
        placeholder="Story"
        value={storyText}
        onChange={e => setStoryText(e.target.value)}
      />
      <button onClick={handleClick}>Add story</button>
      <StoriesList stories={stories}/>
      <button onClick={startGame}>Start game</button>
    </>
  );
};

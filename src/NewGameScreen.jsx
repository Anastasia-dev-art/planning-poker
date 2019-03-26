import React, { useCallback, useState } from "react";

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
      <ul>
        {stories.map((story, index) => (
          <li key={index}>{story.text}</li>
        ))}
      </ul>
      <button onClick={startGame}>Start game</button>
    </>
  );
};

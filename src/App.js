import React, { useState } from "react";
import "./App.css";
import { NewGameScreen } from "./NewGameScreen";
import { GameScreen } from "./GameScreen";

const NEW_GAME = "NEW_GAME"
const GAME = "GAME"

const App = () => {
  const [currentScreen, setScreen] = useState(NEW_GAME);
  const [stories, setStories] = useState([]);

  const handleClick = () => {
    setScreen(currentScreen === NEW_GAME ? GAME : NEW_GAME)
  }

  const addStory = (text) => {
    setStories([...stories, {text}])
  }

  return (
    <>
      {
        {
          NEW_GAME: <NewGameScreen stories={stories} onClick={addStory} startGame={handleClick} />,
          GAME: <GameScreen stories={stories} onClick={handleClick}/>
        }[currentScreen]
      }
    </>
  );
};

export default App;

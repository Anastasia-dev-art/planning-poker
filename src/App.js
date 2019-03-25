import React, { useState } from "react";
import "./App.css";
import { NewGameScreen } from "./NewGameScreen";
import { GameScreen } from "./GameScreen";

const NEW_GAME = "NEW_GAME"
const GAME = "GAME"

const App = () => {
  const [currentScreen, setScreen] = useState(NEW_GAME);

  const handleClick = () => {
    setScreen(currentScreen === NEW_GAME ? GAME : NEW_GAME)
  }

  return (
    <>
      {
        {
          NEW_GAME: <NewGameScreen onClick={handleClick} />,
          GAME: <GameScreen onClick={handleClick}/>
        }[currentScreen]
      }
    </>
  );
};

export default App;

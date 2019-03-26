import React, { useState } from "react";
import "./App.css";
import { NewGameScreen } from "./NewGameScreen";
import { GameScreen } from "./GameScreen";

const NEW_GAME = "NEW_GAME";
const GAME = "GAME";

const voted = story => !story.size;

const App = () => {
  const [currentScreen, setScreen] = useState(GAME);
  const [stories, setStories] = useState([{text: 'Test story 1'}, {text: 'Test story 2'}, {text: 'Test story 3'}]);

  const handleClick = () => {
    setScreen(currentScreen === NEW_GAME ? GAME : NEW_GAME);
  };

  const addStory = text => {
    setStories([...stories, { text }]);
  };

  const currentStory = stories.filter(voted)[0];

  const vote = size => {
    console.log(size)
    currentStory.size = size;
    console.log('--', currentStory)
    console.log(stories)
  };

  return (
    <>
      {
        {
          NEW_GAME: (
            <NewGameScreen
              stories={stories}
              onClick={addStory}
              startGame={handleClick}
            />
          ),
          GAME: (
            <GameScreen
              stories={stories}
              onClick={handleClick}
              currentStory={currentStory}
              vote={vote}
            />
          )
        }[currentScreen]
      }
    </>
  );
};

export default App;

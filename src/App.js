import React, { useReducer } from "react";
import "./App.css";
import { NewGameScreen } from "./NewGameScreen";
import { GameScreen } from "./GameScreen";
import { ResultsScreen } from "./ResultsScreen";

const NEW_GAME = "NEW_GAME";
const GAME = "GAME";
const RESULTS = "RESULTS";

const START_GAME = "START_GAME";
const RESET = "RESET";

const ADD_STORY = "ADD_STORY";
const VOTE = "VOTE";

const unvoted = story => !story.size;

const storiesReducer = (state, action) => {
  switch (action.type) {
    case RESET:
      return { stories: [], screen: NEW_GAME };
    case START_GAME:
      return { ...state, screen: GAME };
    case ADD_STORY:
      return {
        ...state,
        stories: [...state.stories, { text: action.payload }]
      };
    case VOTE:
      const stories = state.stories.map(story =>
        story.text === action.payload.text
          ? { ...story, size: action.payload.size }
          : story
      );
      return {
        ...state,
        stories,
        screen: stories.filter(unvoted).length ? state.screen : RESULTS
      };
    default:
      throw new Error();
  }
};

const App = () => {
  const [state, dispatch] = useReducer(storiesReducer, {
    stories: [],
    screen: NEW_GAME
  });

  const startGame = () => {
    dispatch({ type: START_GAME });
  };

  const addStory = text => {
    dispatch({ type: ADD_STORY, payload: text });
  };

  const { stories, screen } = state;
  const currentStory = stories.filter(unvoted)[0];

  const vote = (size, text) => {
    dispatch({ type: VOTE, payload: { size, text } });
  };

  const startOver = () => {
    dispatch({ type: RESET })
  }

  return (
    <>
      {
        {
          NEW_GAME: (
            <NewGameScreen
              stories={stories}
              onClick={addStory}
              startGame={startGame}
            />
          ),
          GAME: (
            <GameScreen
              stories={stories}
              currentStory={currentStory}
              vote={vote}
            />
          ),
          RESULTS: <ResultsScreen stories={stories} startOver={startOver} />
        }[screen]
      }
    </>
  );
};

export default App;

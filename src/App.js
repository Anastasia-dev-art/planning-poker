import React, { useReducer, useEffect } from "react";
import "./App.css";
import { NewGameScreen } from "./NewGameScreen";
import { GameScreen } from "./GameScreen";
import { ResultsScreen } from "./ResultsScreen";
import styled from 'styled-components'

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
`

const NEW_GAME = "NEW_GAME";
const GAME = "GAME";
const RESULTS = "RESULTS";

const START_GAME = "START_GAME";
const RESET = "RESET";
const SET_STATE = "SET_STATE";

const ADD_STORY = "ADD_STORY";
const VOTE = "VOTE";

const unvoted = story => story.votes.length < players;

const players = 3;

const ws = new WebSocket(`wss://planning-poker-server.glitch.me`);
ws.onerror = () => console.log("WebSocket error");
ws.onopen = () => {
  console.log("WebSocket connection established");
};
ws.onclose = () => console.log("WebSocket connection closed");

const storiesReducer = (state, action) => {
  switch (action.type) {
    case RESET:
      return { stories: [], screen: NEW_GAME };
    case START_GAME:
      return { ...state, screen: GAME };
    case SET_STATE:
      return { ...action.payload };
    case ADD_STORY:
      return {
        ...state,
        stories: [...state.stories, { text: action.payload, votes: [] }]
      };
    case VOTE:
      const stories = state.stories.map(story =>
        story.text === action.payload.text
          ? { ...story, votes: [...story.votes, action.payload.size] }
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

  const vote = (size, text) => {
    dispatch({ type: VOTE, payload: { size, text } });
  };

  const startOver = () => {
    dispatch({ type: RESET });
  };

  useEffect(() => {
    ws.onmessage = (message) => {
      console.log('+++', message)
      dispatch({ type: SET_STATE, payload: JSON.parse(message.data) });
    }
  },[])

  useEffect(() => {
    console.log('---',state)
    try {
      ws.send(JSON.stringify(state))
    } catch (e) {}
  }, [state.stories.length, state.screen]);

  const { stories, screen } = state;
  const currentStory = stories.filter(unvoted)[0];

  return (
    <FlexContainer>
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
    </FlexContainer>
  );
};

export default App;

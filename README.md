# Planning poker

Server is available at [Glitch](https://planning-poker-server.glitch.me/)

## React Hooks

Simple counter example

```jsx
import { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## NewGameScreen

```jsx
import React, { useCallback, useState } from "react";
import { StoriesList } from "./StoriesList";
import { Panel, InputGroup, StoryInput, Button } from "./Components";

export const NewGameScreen = ({ stories, onClick, startGame }) => {
  const [storyText, setStoryText] = useState("");

  const handleClick = useCallback(() => {
    if (
      storyText === "" ||
      stories.filter(story => story.text === storyText).length
    ) {
      return;
    }
    onClick(storyText);
    setStoryText("");
  }, [storyText]);

  return (
    <Panel>
      <h1>Create Stories</h1>
      <InputGroup>
        <StoryInput
          type="text"
          placeholder="Story"
          value={storyText}
          onChange={e => setStoryText(e.target.value)}
        />
        <button onClick={handleClick}>Add story</button>
      </InputGroup>
      <StoriesList stories={stories} />
      <Button onClick={startGame}>Start game</Button>
    </Panel>
  );
};
```

## useReducer

```jsx
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
```

# Store Context

```jsx
export const StoreContext = createContext();

export const Store = ({ reducer, initialState, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};

```
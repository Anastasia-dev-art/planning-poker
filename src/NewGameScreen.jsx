import React from "react";
import { StoriesList } from "./StoriesList";
import { Panel, InputGroup, StoryInput, Button } from "./Components";

export const NewGameScreen = ({ stories, onClick, startGame }) => {
  return (
    <Panel>
      <h1>Create Stories</h1>
      <InputGroup>
        <StoryInput
          type="text"
          placeholder="Story"
        />
        <button>Add story</button>
      </InputGroup>
      <StoriesList stories={stories} />
      <Button onClick={startGame}>Start game</Button>
    </Panel>
  );
};

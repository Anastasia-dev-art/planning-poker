import React from "react";
import {StoriesList} from './StoriesList'
import {Panel, Button} from "./Components"

export const ResultsScreen = ({ stories, startOver }) => (
    <Panel>
      <h1>Results</h1>
      <StoriesList stories={stories} showVotes/>
      <Button onClick={startOver}>Start over</Button>
    </Panel>
  );

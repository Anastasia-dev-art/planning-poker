import React from "react";
import {StoriesList} from './StoriesList'

export const ResultsScreen = ({ stories, startOver }) => (
    <>
      <h1>Results</h1>
      <StoriesList stories={stories}/>
      <button onClick={startOver}>Start over</button>
    </>
  );

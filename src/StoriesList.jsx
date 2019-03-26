import React from "react";

export const StoriesList = ({ stories }) => {
  return (
    <ul>
      {stories.map((story, index) => (
        <li key={index}>{story.text} {story.votes.join(', ')}</li>
      ))}
    </ul>
  );
};

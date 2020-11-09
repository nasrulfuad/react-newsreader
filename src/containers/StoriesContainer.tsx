import React, { FC, useState, useEffect } from "react";
import { Story } from "../components/Story";
import HackerNewsApi from "../services/HackerNewsApi";

const initialStateStoryIds: number[] = [];

export const StoriesContainer: FC = () => {
  const [storyIds, setStoryIds] = useState(initialStateStoryIds);

  useEffect(() => {
    HackerNewsApi.getStoryIds().then((data) => setStoryIds(data));
    HackerNewsApi.getStory(25033006).then((data) => console.log(data));
  }, []);

  return (
    <>
      <h1>Hackernews Stories</h1>
      {storyIds.map((storyId) => (
        <Story key={storyId} storyId={storyId} />
      ))}
    </>
  );
};

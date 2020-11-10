import React, { FC, useState, useEffect } from "react";
import { Story } from "../components/Story";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import HackerNewsApi from "../services/HackerNewsApi";
import {
  GlobalStyle,
  StoriesContainerWrapper,
} from "../styles/StoriesContainerStyle";

const initialStateStoryIds: number[] = [];

export const StoriesContainer: FC = () => {
  const [storyIds, setStoryIds] = useState(initialStateStoryIds);
  const { count } = useInfiniteScroll();

  useEffect(() => {
    HackerNewsApi.getStoryIds().then((data) => setStoryIds(data));
  }, []);

  return (
    <>
      <GlobalStyle />
      <StoriesContainerWrapper data-testid="stories-container">
        <h1>Hackernews Stories</h1>
        {storyIds.slice(0, count).map((storyId) => (
          <Story key={storyId} storyId={storyId} />
        ))}
      </StoriesContainerWrapper>
    </>
  );
};

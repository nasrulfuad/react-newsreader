/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useEffect, memo } from "react";
import moment from "moment";
import HackerNewsApi, { StoryType } from "../services/HackerNewsApi";
import {
  StoryMeta,
  StoryMetaElement,
  StoryTitle,
  StoryWrapper,
} from "../styles/StoryStyles";

interface Props {
  storyId: number;
}

const initialStateStory = {} as StoryType;

export const Story: FC<Props> = memo(({ storyId }: Props) => {
  const [story, setStory] = useState(initialStateStory);

  useEffect(() => {
    HackerNewsApi.getStory(storyId).then(
      (data) => data && data.url && setStory(data)
    );
  }, []);

  return story && story.url ? (
    <StoryWrapper data-testid="story">
      <StoryTitle>
        <a href={story.url}>{story.title}</a>
      </StoryTitle>

      <StoryMeta>
        <span className="story__by" data-testid="story-by">
          <StoryMetaElement color="#000">By : </StoryMetaElement>
          {story.by}
        </span>
        <span className="story__time" data-testid="story-time">
          <StoryMetaElement color="#000">Posted : </StoryMetaElement>
          {moment.unix(story.time).fromNow()}
        </span>
      </StoryMeta>
    </StoryWrapper>
  ) : null;
});

import { StoryType } from "../services/HackerNewsApi";

export const singularStory: StoryType = {
  id: 1,
  by: "Nasrul Fuad",
  time: 1535498723,
  title: "Sample story title",
  url: "https://google.com",
};

export const storyIds = [1];

export const emptySingularStory: StoryType | object = {
  id: undefined,
  by: undefined,
  time: undefined,
  title: undefined,
  url: undefined,
};

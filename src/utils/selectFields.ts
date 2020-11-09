import { StoryType } from "../services/HackerNewsApi";

export const selectFields = ({ id, by, url, time, title }: StoryType) => ({
  id,
  by,
  title,
  url,
  time,
});

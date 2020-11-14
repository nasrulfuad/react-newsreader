export type ArticleType = {
  id: number;
  by: string;
  title: string;
  time: number;
  url?: string;
};

export const singularStory: ArticleType = {
  id: 1,
  by: "Nasrul Fuad",
  time: 1535498723,
  title: "Sample story title",
  url: "https://google.com"
};

export const storyIds = [1];

export const emptySingularStory: ArticleType | object = {
  id: undefined,
  by: undefined,
  time: undefined,
  title: undefined,
  url: undefined
};

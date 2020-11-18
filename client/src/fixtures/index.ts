export type ArticleType = {
  id: number;
  by: string;
  title: string;
  time: number;
  url?: string;
};

export const allArticles = {
  allArticles: [
    {
      id: 1,
      author: "Nasrul Fuad",
      time: 1567209822,
      title: "This is a cool title!",
      url: "https://google.com",
      source: 'hackernews',
      __typename: 'author',
    }
  ]
};

export const noArticles = {
  allArticles: []
}

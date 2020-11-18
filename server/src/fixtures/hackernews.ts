import { Article, HackerNewsArticleResponse } from "../types";

export const emptyReducerReturnValue: any = {
  id: "hn-undefined",
  title: undefined,
  author: undefined,
  url: undefined,
  time: undefined,
  source: "HackerNews"
};

export const getArticlePreReducerStub: HackerNewsArticleResponse = {
  id: "21168364",
  title: "How to Stress the C# Compiler",
  by: "kristianp",
  url: "https://blog.hediet.de/post/how-to-stress-the-csharp-compiler",
  time: "1570314101"
};

export const getArticlePostReducerStub: Article = {
  id: "hn-21168364",
  title: "How to Stress the C# Compiler",
  author: "kristianp",
  url: "https://blog.hediet.de/post/how-to-stress-the-csharp-compiler",
  time: "1570314101",
  source: "HackerNews"
};

export const getAllArticleIdsStub: number[] = [21168364];

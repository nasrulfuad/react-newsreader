import { HackerNewsApi } from "./data-sources/HackerNewsApi";
import { NewYorkTimesApi } from "./data-sources/NewYorkTimesApi";

export interface HackerNewsArticleResponse {
  id: string;
  title: string;
  by: string;
  url: string;
  time: string;
}

export interface NewYorkTimesArticleResponse {
  id: string;
  title: string;
  byline: string;
  url: string;
  published_date: string;
}

export type SourceTypes = "hackernews" | "newyorktimes";

export interface Article {
  id: string;
  title: string;
  author: string;
  url: string;
  time: string;
  source: string;
}

export type Args = {
  id?: number;
  ids: number[];
  source: string;
};

export interface DataSources {
  hackernews: HackerNewsApi;
  newyorktimes: NewYorkTimesApi;
}

export interface Context {
  dataSources: DataSources;
}

export interface DynamicProperty {
  [key: string]: any;
}

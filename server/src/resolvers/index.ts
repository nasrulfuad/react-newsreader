import { arrayMap } from "../utils/arrayMap";
import { Context, DynamicProperty, Args, SourceTypes } from "../types";

export const resolvers = {
  Query: {
    allArticles: (_: void, __: void, context: Context) =>
      Promise.all(
        Object.keys(context.dataSources).map((source: SourceTypes) => {
          return context.dataSources[source].getAllArticles();
        })
      ).then((results: any[]) => arrayMap(results)),

    allArticlesBySource: (_: void, { source }: Args, context: Context) =>
      (context.dataSources as DynamicProperty)[source].getAllArticles(),

    articleBySource: (_: void, { id, source }: Args, context: Context) =>
      (context.dataSources as DynamicProperty)[source].getArticle(id, source),

    articlesBySource: (_: void, { ids, source }: Args, context: Context) =>
      (context.dataSources as DynamicProperty)[source].getArticlesByIds(ids)
  }
};

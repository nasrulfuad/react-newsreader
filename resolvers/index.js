import { arrayMap } from "../utils/arrayMap";

export const resolvers = {
  Query: {
    allArticles: (_, __, context) =>
      Promise.all(
        Object.keys(context.dataSources).map(source =>
          context.dataSources[source].getAllArticles()
        )
      ).then(results => arrayMap(results)),

    allArticlesBySource: (_, { source }, context) =>
      context.dataSources[source].getAllArticles(),

    articleBySource: (_, { id, source }, context) =>
      context.dataSources[source].getArticle(id, source),

    articlesBySource: (_, { ids, source }, context) =>
      context.dataSources[source].getArticlesByIds(ids)
  }
};

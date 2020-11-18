import { ApolloServer, gql } from "apollo-server";
import { createTestClient } from "apollo-server-testing";
import { NewYorkTimesApi } from "../datasources/NewYorkTimesApi";
import { getArticlePreReducerStub } from "../fixtures/newyorktimes";
import { resolvers } from "../resolvers";
import { typeDefs } from "../typedefs";

const GET_ALL_ARTICLES_BY_SOURCE = gql`
  query getAllArticlesBySource($source: String!) {
    allArticlesBySource(source: $source) {
      id
      title
      author
      url
      time
      source
    }
  }
`;

const constructTestServer = () => {
  const newyorktimesAPI = new NewYorkTimesApi();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      newyorktimes: newyorktimesAPI,
    }),
  });

  return { server, newyorktimesAPI };
};

describe("[Queries.NewYorkTimesAPI]", () => {
  it("fetches an array of articles from the NewYorkTimesApi", async () => {
    const { server, newyorktimesAPI } = constructTestServer();
    newyorktimesAPI.get = jest.fn(() => ({
      results: [getArticlePreReducerStub],
    }));

    const { query } = createTestClient(server);

    const response = await query({
      query: GET_ALL_ARTICLES_BY_SOURCE,
      variables: { source: "newyorktimes" },
    });

    expect(response).toMatchSnapshot();
  });
});

import { gql } from "apollo-server";
import { createTestClient } from "apollo-server-testing";
import { NewYorkTimesApi } from "../data-sources/NewYorkTimesApi";
import { getArticlePreReducerStub } from "../fixtures/newyorktimes";
import { ConstructTestServer } from "../testUtils/ConstructTestServer";

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

describe("[Queries.NewYorkTimesAPI]", () => {
  it("fetches an array of articles from the NewYorkTimesApi", async () => {
    const { server, dataSource } = new ConstructTestServer<NewYorkTimesApi>(
      NewYorkTimesApi,
      "newyorktimes"
    );

    (dataSource as any).get = jest.fn(() => ({
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

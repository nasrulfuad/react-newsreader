import { NewYorkTimesApi } from "../data-sources/NewYorkTimesApi";
import {
  emptyReducerReturnValue,
  getArticlePreReducerStub,
  getArticlePostReducerStub
} from "../fixtures/newyorktimes";

const getMock: jest.Mock = jest.fn();

const dataSource = new NewYorkTimesApi();

jest.mock("apollo-datasource-rest", () => {
  class MockRESTDataSource {
    baseUrl = "";
    get = getMock;
  }

  return {
    RESTDataSource: MockRESTDataSource
  };
});

describe("[NewYorkTimes.articleReducer]", () => {
  it("properly transform using article reducer", () => {
    expect(dataSource.articleReducer(getArticlePreReducerStub)).toEqual(
      getArticlePostReducerStub
    );
  });

  it("does not transform using article reducer", () => {
    expect(dataSource.articleReducer()).toEqual(emptyReducerReturnValue);
  });
});

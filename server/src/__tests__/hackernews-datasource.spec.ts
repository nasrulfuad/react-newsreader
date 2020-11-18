import { HackerNewsApi } from "../data-sources/HackerNewsApi";
import {
  emptyReducerReturnValue,
  getArticlePreReducerStub,
  getArticlePostReducerStub,
  getAllArticleIdsStub
} from "../fixtures/hackernews";

const getMock: jest.Mock = jest.fn();

const dataSource = new HackerNewsApi();

jest.mock("apollo-datasource-rest", () => {
  class MockRESTDataSource {
    baseUrl = "";
    get = getMock;
  }

  return {
    RESTDataSource: MockRESTDataSource
  };
});

describe("[HackerNewsApi.article]", () => {
  it("transform using the article reducer", () => {
    expect(dataSource.articleReducer(getArticlePreReducerStub)).toEqual(
      getArticlePostReducerStub
    );
  });

  it("does not transform using the article reducer", () => {
    expect(dataSource.articleReducer()).toEqual(emptyReducerReturnValue);
  });
});

describe("[HackerNewsApi.getArticle]", () => {
  it("gets a single article from the HackerNewsApi", async () => {
    getMock.mockReturnValueOnce(getArticlePreReducerStub);

    const id = 1;

    const response = await dataSource.getArticle(id);

    expect(response).toEqual(getArticlePostReducerStub);

    expect(getMock).toHaveBeenCalled();

    expect(getMock).toHaveBeenCalledWith(`item/${id}.json`);
  });
});

describe("[HackerNewsApi.getArticlesByIds]", () => {
  it("gets an array of articles from the HackerNewsApi", async () => {
    getMock.mockReturnValueOnce(getArticlePreReducerStub);

    const id = 1;

    const response = await dataSource.getArticlesByIds([id]);

    expect(response).toEqual([getArticlePostReducerStub]);

    expect(getMock).toHaveBeenCalled();

    expect(getMock).toBeCalledWith(`item/${id}.json`);
  });
});

describe("[HackerNewsApi.getAllArticleIds]", () => {
  it("gets an array of article ids from the HackerNewsApi", async () => {
    getMock.mockReturnValueOnce([getAllArticleIdsStub]);

    const response = await dataSource.getAllArticleIds();

    expect(response).toEqual([getAllArticleIdsStub]);

    expect(getMock).toHaveBeenCalled();

    expect(getMock).toBeCalledWith("topstories.json");
  });
});

describe("[HackerNewsApi.getAllArticles]", () => {
  it("gets an array all articles from the HackerNewsApi", async () => {
    const getAllArticleIdsMock: jest.Mock = (dataSource.getAllArticleIds = jest.fn());

    getAllArticleIdsMock.mockReturnValueOnce(getAllArticleIdsStub);

    getMock.mockReturnValueOnce(getArticlePreReducerStub);

    const response = await dataSource.getAllArticles();

    expect(response).toEqual([getArticlePostReducerStub]);

    expect(getMock).toHaveBeenCalled();

    expect(getMock).toBeCalledWith("item/21168364.json");
  });
});

import { HackerNewsApi } from "../datasources/HackerNewsApi";
import {
  emptyReducerReturnValue,
  getArticlePreReducerStub,
  getArticlePostReducerStub,
  getAllArticleIdsStub
} from "../fixtures/hackernews";

const ds = new HackerNewsApi();
ds.get = jest.fn();

describe("[HackerNewsApi.article]", () => {
  it("transform using the article reducer", () => {
    expect(ds.articleReducer(getArticlePreReducerStub)).toEqual(
      getArticlePostReducerStub
    );
  });

  it("does not transform using the article reducer", () => {
    expect(ds.articleReducer()).toEqual(emptyReducerReturnValue);
  });
});

describe("[HackerNewsApi.getArticle]", () => {
  it("gets a single article from the HackerNewsApi", async () => {
    ds.get.mockReturnValueOnce(getArticlePreReducerStub);
    const id = 1;
    const response = await ds.getArticle(id);

    expect(response).toEqual(getArticlePostReducerStub);
    expect(ds.get).toHaveBeenCalled();
    expect(ds.get).toBeCalledWith(`item/${id}.json`);
  });
});

describe("[HackerNewsApi.getArticlesByIds]", () => {
  it("gets an array of articles from the HackerNewsApi", async () => {
    ds.get.mockReturnValueOnce(getArticlePreReducerStub);
    const id = 1;
    const response = await ds.getArticlesByIds([id]);

    expect(response).toEqual([getArticlePostReducerStub]);
    expect(ds.get).toHaveBeenCalled();
    expect(ds.get).toBeCalledWith(`item/${id}.json`);
  });
});

describe("[HackerNewsApi.getAllArticleIds]", () => {
  it("gets an array of article ids from the HackerNewsApi", async () => {
    ds.get.mockReturnValueOnce([getAllArticleIdsStub]);
    const response = await ds.getAllArticleIds([1]);

    expect(response).toEqual([getAllArticleIdsStub]);
    expect(ds.get).toHaveBeenCalled();
    expect(ds.get).toBeCalledWith("topstories.json");
  });
});

describe("[HackerNewsApi.getAllArticles]", () => {
  it("gets an array all articles from the HackerNewsApi", async () => {
    ds.getAllArticleIds = jest.fn();
    ds.getAllArticleIds.mockReturnValueOnce(getAllArticleIdsStub);
    ds.get.mockReturnValueOnce(getArticlePreReducerStub);
    const response = await ds.getAllArticles();

    expect(response).toEqual([getArticlePostReducerStub]);
    expect(ds.get).toHaveBeenCalled();
    expect(ds.get).toBeCalledWith("item/21168364.json");
  });
});

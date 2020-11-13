import { NewYorkTimesApi } from "../datasources/NewYorkTimesApi";
import {
  emptyReducerReturnValue,
  getArticlePreReducerStub,
  getArticlePostReducerStub
} from "../fixtures/newyorktimes";

const ds = new NewYorkTimesApi();
ds.get = jest.fn();

describe("[NewYorkTimes.articleReducer]", () => {
  it("properly transform using article reducer", () => {
    expect(ds.articleReducer(getArticlePreReducerStub)).toEqual(
      getArticlePostReducerStub
    );
  });

  it("does not transform using article reducer", () => {
    expect(ds.articleReducer()).toEqual(emptyReducerReturnValue);
  });
});

import { RESTDataSource } from "apollo-datasource-rest";
import { Article, NewYorkTimesArticleResponse } from "../types";

export class NewYorkTimesApi extends RESTDataSource {
  articleReducer(
    {
      id,
      byline,
      url,
      published_date,
      title,
    }: NewYorkTimesArticleResponse = {} as any
  ): Article {
    return {
      id: `nyt-${id}`,
      title,
      author: byline,
      url,
      time: published_date,
      source: "New York Times",
    };
  }

  async getAllArticles() {
    const response = await this.get(
      "https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=LohNACoAbUVt7FLddtWbirCzX9uChVbC"
    );

    return response?.results?.map((article: NewYorkTimesArticleResponse) =>
      this.articleReducer(article)
    );
  }
}

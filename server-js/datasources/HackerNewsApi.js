import { RESTDataSource } from "apollo-datasource-rest";

export class HackerNewsApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://hacker-news.firebaseio.com/v0/";
  }

  articleReducer({ id, by, url, time, title } = {}) {
    return {
      id: `hn-${id}`,
      title,
      author: by,
      url,
      time,
      source: "HackerNews",
    };
  }

  async getAllArticleIds() {
    const response = await this.get("topstories.json");
    return response;
  }

  async getArticle(articleId) {
    const response = await this.get(`item/${articleId}.json`);
    return this.articleReducer(response);
  }

  getArticlesByIds(articleIds) {
    return Promise.all(
      articleIds.map((articleId) => this.getArticle(articleId))
    );
  }

  async getAllArticles() {
    let articleIds = await this.getAllArticleIds();
    articleIds = articleIds.slice(0, 100);
    return Promise.all(
      articleIds.map((articleId) => this.getArticle(articleId))
    );
  }
}

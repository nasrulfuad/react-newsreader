import axios from "axios";
import { selectFields } from "../utils/selectFields";

export type StoryType = {
  id: number;
  by: string;
  title: string;
  time: number;
  url?: string;
};

class HackerNewsApi {
  public baseURL: string = "https://hacker-news.firebaseio.com/v0/";

  public newStoriesURL: string = `${this.baseURL}newstories.json`;

  public storyUR: string = `${this.baseURL}item/`;

  public async getStoryIds(): Promise<number[]> {
    return await (await axios.get(this.newStoriesURL)).data;
  }

  public async getStory(id: number): Promise<StoryType> {
    const response = await (await axios.get(`${this.storyUR + id}.json`)).data;
    return response && selectFields(response);
  }
}

export default new HackerNewsApi();

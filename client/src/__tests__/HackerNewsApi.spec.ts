import axios from "axios";
import { emptySingularStory, singularStory, storyIds } from "../fixtures";
import HackerNewsApi from "../services/HackerNewsApi";

jest.mock("axios");

/** Create axios type for mocked */
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Hackernews Api", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("getStory functionality", () => {
    it("request and gets a story from the HackerNewsApi", async () => {
      /** Mock axios.get */
      mockedAxios.get.mockImplementation(() =>
        Promise.resolve({ data: singularStory })
      );

      const entity = await HackerNewsApi.getStory(1);

      expect(entity).toEqual(singularStory);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `${HackerNewsApi.storyUR + 1}.json`
      );
    });

    it("does not retrieve a story from the HackerNewsApi", async () => {
      mockedAxios.get.mockImplementation(() =>
        Promise.resolve({ data: emptySingularStory })
      );

      const entity = await HackerNewsApi.getStory(1);
      expect(entity).toEqual(emptySingularStory);
    });
  });

  describe("getStoryIds functionality", () => {
    it("request and gets a story ids from the HackerNewsApi", async () => {
      mockedAxios.get.mockImplementation(() =>
        Promise.resolve({ data: storyIds })
      );

      const entity = await HackerNewsApi.getStoryIds();

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(HackerNewsApi.newStoriesURL);
      expect(entity).toEqual(storyIds);
    });
  });
});

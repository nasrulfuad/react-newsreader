import { act } from "react-dom/test-utils";
import React from "react";
import { App } from "../App";
import { cleanup, render, waitFor } from "@testing-library/react";
import { STORY_INCREMENT } from "../constants";
import { singularStory, storyIds } from "../fixtures";
import HackerNewsApi from "../services/HackerNewsApi";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

jest.mock("../hooks/useInfiniteScroll");
jest.mock("../services/HackerNewsApi", () => ({
  getStory: jest.fn(),
  getStoryIds: jest.fn(),
}));

const mockedUseInfiniteScroll = useInfiniteScroll as jest.Mock;
const mockedGetStory = HackerNewsApi.getStory as jest.Mock;
const mockedGetStoryIds = HackerNewsApi.getStoryIds as jest.Mock;

beforeEach(cleanup);

it("renders the story container with a story", async () => {
  mockedGetStory.mockImplementation(() => Promise.resolve(singularStory));
  mockedGetStoryIds.mockImplementation(() => Promise.resolve(storyIds));
  mockedUseInfiniteScroll.mockImplementation(() => ({
    count: STORY_INCREMENT,
  }));

  await act(async () => {
    const { getByText, queryByTestId } = render(<App />);

    await waitFor(() => [
      expect(getByText("Hackernews Stories")).toBeTruthy(),
      expect(getByText("Sample story title")).toBeTruthy(),
      expect(queryByTestId("story-by")?.textContent).toEqual(
        "By : Nasrul Fuad"
      ),
    ]);
  });
});

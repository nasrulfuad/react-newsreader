import { cleanup, render, waitFor } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import { Story } from "../components/Story";
import { singularStory } from "../fixtures";
import HackerNewsApi from "../services/HackerNewsApi";

jest.mock("../services/HackerNewsApi", () => ({
  getStory: jest.fn(),
  getStoryIds: jest.fn(),
}));

const mockedGetStory = HackerNewsApi.getStory as jest.Mock;

beforeEach(() => {
  cleanup();
  jest.resetAllMocks();
});

it("renders the story component with content", async () => {
  mockedGetStory.mockImplementation(() => Promise.resolve(singularStory));

  await act(async () => {
    const { getByText, getByTestId } = render(<Story storyId={1} />);

    await waitFor(() => {
      expect(getByTestId("story")).toBeTruthy();
      expect(getByText("Sample story title")).toBeTruthy();
      expect(getByTestId("story-by")?.textContent).toEqual("By : Nasrul Fuad");
    });
  });
});

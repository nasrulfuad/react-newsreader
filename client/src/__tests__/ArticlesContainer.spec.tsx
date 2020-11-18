import React from "react";
import { act } from "react-dom/test-utils";
import { cleanup, render, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import { ArticlesContainer } from "../containers/ArticlesContainer";
import { STORY_INCREMENT } from "../constants";
import { allArticles, noArticles } from "../fixtures";
import { GET_ALL_ARTICLES } from "../graphql/get-all-articles";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

jest.mock("../hooks/useInfiniteScroll");

const mockedUseInfiniteScroll = useInfiniteScroll as jest.Mock;

beforeEach(() => {
  cleanup();
  jest.resetAllMocks();
});

it("renders the <ArticlesContainer /> with articles", async () => {
  const allArticlesMocks = [
    {
      request: {
        query: GET_ALL_ARTICLES
      },
      result: {
        data: {
          ...allArticles
        }
      }
    }
  ];
  mockedUseInfiniteScroll.mockImplementation(() => ({
    count: STORY_INCREMENT
  }));

  await act(async () => {
    const { getByText, queryByTestId } = render(
      <MockedProvider mocks={allArticlesMocks}>
        <ArticlesContainer />
      </MockedProvider>
    );

    await waitFor(() => [
      expect(getByText("News Articles")).toBeTruthy(),
      expect(getByText("This is a cool title!")).toBeTruthy(),
      expect(queryByTestId("article-author")?.textContent).toEqual(
        "Author : Nasrul Fuad"
      )
    ]);
  });
});

it("does not render articles when there is no articles", async () => {
  const noArticlesMocks = [
    {
      request: {
        query: GET_ALL_ARTICLES
      },
      result: {
        data: {
          ...noArticles,
        }
      }
    }
  ];

  mockedUseInfiniteScroll.mockImplementation(() => ({
    count: STORY_INCREMENT
  }));

  await act(async () => {
    const { queryByText, queryByTestId } = render(
      <MockedProvider mocks={noArticlesMocks}>
        <ArticlesContainer />
      </MockedProvider>
    );

    await waitFor(() => [
      expect(queryByText("News Articles")).toBeTruthy(),
      expect(queryByText("This is a cool title!")).toBeFalsy(),
      expect(queryByTestId("article-author")).toBeFalsy()
    ]);
  });
});

import React, { FC } from "react";
import { useQuery } from "@apollo/client";
import { Article } from "../components/Article";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { GET_ALL_ARTICLES } from "../graphql/get-all-articles";
import {
  GlobalStyle,
  ArticlesContainerWrapper,
} from "../styles/ArticlesContainerStyle";

export const ArticlesContainer: FC = () => {
  const { count } = useInfiniteScroll();
  const { data: { allArticles = [] } = {} } = useQuery(GET_ALL_ARTICLES);

  return (
    <>
      <GlobalStyle />
      <ArticlesContainerWrapper data-testid="articles-container">
        <h1>News Articles</h1>
        {allArticles &&
          allArticles
            .slice(0, count)
            .map((article: any) => (
              <Article key={article.id} article={article} />
            ))}
      </ArticlesContainerWrapper>
    </>
  );
};

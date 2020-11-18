import React, { FC, memo } from "react";
import moment from "moment";
import {
  ArticleMeta,
  ArticleMetaElement,
  ArticleTitle,
  ArticleWrapper
} from "../styles/ArticleStyles";

interface Props {
  article: any;
}

export const Article: FC<Props> = memo(({ article }: Props) => {
  return (
    <ArticleWrapper data-testid="article">
      <ArticleTitle>
        <a href={article.url}>{article.title}</a>
      </ArticleTitle>

      <ArticleMeta>
        <span className="article__by" data-testid="article-author">
          <ArticleMetaElement color="#000">Author : </ArticleMetaElement>
          {article.author}
        </span>
        <span className="article__time" data-testid="article-time">
          <ArticleMetaElement color="#000">Posted : </ArticleMetaElement>
          {moment.unix(article.time).fromNow()}
        </span>
      </ArticleMeta>
    </ArticleWrapper>
  );
});

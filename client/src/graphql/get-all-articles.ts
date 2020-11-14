import { gql } from "@apollo/client";

export const GET_ALL_ARTICLES = gql`
  query getAllArticles {
    allArticles {
      id
      title
      author
      url
      time
      source
    }
  }
`;

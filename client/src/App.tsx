import React from "react";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import { ArticlesContainer } from "./containers/ArticlesContainer";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({
    uri: "http://localhost:4000"
  })
});

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <ArticlesContainer />
    </ApolloProvider>
  );
};

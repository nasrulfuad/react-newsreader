# Newsreader client based on react and typescript

![Preview](client/preview.png?raw=true)

## Server based on apollo server and typescript

![Preview](server/preview.png?raw=true)

```
query getArticleByIdAndSource {
  articleBySource(id: "21168364", source: "hackernews") {
    ...articleFields
  }
}

query getAFewArticlesBySource {
  articlesBySource(ids: [21168561, 21168365, 21168364], source: "hackernews") {
    ...articleFields
  }
}

query getAllArticlesBySource {
  hackernews: allArticlesBySource(source: "hackernews") {
    ...articleFields
  }

  newyorktimes: allArticlesBySource(source: "newyorktimes") {
    ...articleFields
  }
}

query getAllArticles {
  allArticles {
    ...articleFields
  }
}

query getArticleByIdAndSourceWithVars($id: ID!, $source: String!) {
  articleBySource(id: $id, source: $source) {
    ...articleFields
  }
}

fragment articleFields on Article {
  id
  title
  author
  url
  time
  source
}
```

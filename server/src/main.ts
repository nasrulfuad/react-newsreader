import { ApolloServer } from "apollo-server";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import dataSources from "./data-sources";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ ...dataSources })
});

server.listen().then(({ url }) => console.log(`🚀️ Server is ready at ${url}`));

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => console.log("Module disposed. "));
}

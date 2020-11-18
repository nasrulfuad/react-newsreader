import { ApolloServer } from "apollo-server";
import { typeDefs } from "../typeDefs";
import { resolvers } from "../resolvers";

export class ConstructTestServer<T> {
  public server: ApolloServer;
  public dataSource: T;

  constructor(private DataSource: new () => T, private dataSources: string) {
    this.createServer();
  }

  private createServer() {
    this.dataSource = new this.DataSource();

    this.server = new ApolloServer({
      typeDefs,
      resolvers,
      dataSources: () => ({ [this.dataSources]: this.dataSource }),
    });
  }
}

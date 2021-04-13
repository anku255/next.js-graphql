import { ApolloServer } from "apollo-server-micro";
import "../../src/config/database";
import graphqlSchema from "../../src/graphql/schema";
import { redisConnection } from "../../src/utils/redis";

const redisClient = redisConnection();

const apolloServer = new ApolloServer({
  schema: graphqlSchema,
  introspection: true,
  context: (ctx) => ({
    redisClient,
  }),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const graphqlHandler = apolloServer.createHandler({ path: "/api/graphql" });

export default graphqlHandler;

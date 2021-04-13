import { ApolloServer } from "apollo-server-micro";
import "../../src/config/database";
import graphqlSchema from "../../src/graphql/schema";
import { redisConnection } from "../../src/utils/redis";
import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
  methods: ['POST', 'GET'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

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

async function customHandler(req, res) {
  await runMiddleware(req, res, cors)
  return graphqlHandler(req, res);
}

export default customHandler;

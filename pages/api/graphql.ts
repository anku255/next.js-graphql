import { ApolloServer, gql } from 'apollo-server-micro';
import '../../src/config/database';
import graphqlSchema from '../../src/graphql/schema';

const typeDefs = gql`
  type Query {
    users: [User!]!
  }
  type User {
    name: String
  }
`

const resolvers = {
  Query: {
    users(parent, args, context) {
      return [{ name: 'Nextjs' }]
    },
  },
}

const apolloServer = new ApolloServer({ schema: graphqlSchema, introspection: true })

export const config = {
  api: {
    bodyParser: false,
  },
}

const graphqlHandler = apolloServer.createHandler({ path: '/api/graphql' });

const customHandler = (req, res) => {
  // res.setHeader('content-type', 'text/html; charset=utf8');
  // // res.headers['content-type'] = 'text/html; charset=utf8';
  // return res.send(`
  // <!DOCTYPE html>
  //   <html>
  //   <body>
  //     <h1>Hello</h1>
  //   </body>
  //   </html>
  // `)
  // console.log("req.method", req.method)
  return graphqlHandler(req, res);
}

export default customHandler;
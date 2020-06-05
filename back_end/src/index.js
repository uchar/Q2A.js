const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const { getQuestions } = require('./question');

const typeDefs = gql`
  type Question {
    id: String
    title: String
    content: String
  }

  type Query {
    questions: [Question]
  }
`;

const resolvers = {
  Query: {
    questions: getQuestions,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);

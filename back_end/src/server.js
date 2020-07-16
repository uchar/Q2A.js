const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const { getQuestions, getQuestion, getAnswers, getAnswersCount, getComments } = require('./post');
const { getAllTags, getQuestionTags } = require('./tag');

const port = 4000;

const typeDefs = gql`
  type Question {
    id: String
    title: String
    content: String
    profileImage: String
    creator: String
    createdAt: Int
    viewsCount: Int
    votesCount: Int
    answersCount: Int
    tags: [Tag]
    answers: [Answer]
    comments: [Comment]
  }

  type Answer {
    id: String
    content: String
    profileImage: String
    creator: String
    votesCount: Int
    createdAt: Int
    comments: [Comment]
  }

  type Comment {
    id: String
    content: String
    profileImage: String
    creator: String
    createdAt: Int
  }

  type Tag {
    id: String
    title: String
    count: Int
  }

  type Query {
    questions: [Question]
    tags: [Tag]
    getQuestion(id: String!): Question
  }
`;

const resolvers = {
  Query: {
    questions: getQuestions,
    tags: getAllTags,
    getQuestion,
  },
  Question: {
    tags: getQuestionTags,
    answers: getAnswers,
    comments: getComments,
    answersCount: getAnswersCount,
  },
  Answer: {
    comments: getComments,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port }, () => console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`));

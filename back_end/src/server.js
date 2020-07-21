require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const { preparePromise } = require('./serverPreprations');
const {
  getLatestQuestions,
  getPopularQuestions,
  getMostViewsQuestions,
  getNoAnswersQuestions,
  getQuestion,
  getAnswers,
  getComments,
  getUserAnswers,
  getUserClapItems,
  getUserQuestions,
} = require('./post');
const { getAllTags, getTagDetail } = require('./tag');
const { getUser } = require('./user');

const port = 4000;

const typeDefs = gql`
  type User {
    publicName: String
    profileImage: String
    about: String
    questions: [Question]
    answers: [Answer]
    clapItems: [ClapItem]
  }
  enum PostType {
    QUESTION
    ANSWER
    COMMENT
  }
  type ClapItem {
    type: PostType
    question: Question
    answer: Answer
  }
  type Question {
    id: String
    title: String
    content: String
    user: User
    createdAt: String
    viewsCount: Int
    votesCount: Int
    answersCount: Int
    tag1: String
    tag2: String
    tag3: String
    tag4: String
    tag5: String
    answers: [Answer]
    comments: [Comment]
  }

  type Answer {
    id: String
    content: String
    user: User
    votesCount: Int
    createdAt: String
    comments: [Comment]
  }

  type Comment {
    id: String
    content: String
    user: User
    createdAt: String
  }

  type Tag {
    id: String
    title: String
    content: String
    used: Int
  }

  type Query {
    latestQuestions(tag: String, limit: Int, offset: Int): [Question]
    popularQuestions(tag: String, limit: Int, offset: Int): [Question]
    mostViewsQuestions(tag: String, limit: Int, offset: Int): [Question]
    noAnswersQuestions(tag: String, limit: Int, offset: Int): [Question]
    getTags(limit: Int, offset: Int): [Tag]
    getTagDetail(tag: String!): Tag
    getQuestion(id: String!): Question
    getUser(id: String!): User
  }
`;

const resolvers = {
  Query: {
    latestQuestions: getLatestQuestions,
    popularQuestions: getPopularQuestions,
    mostViewsQuestions: getMostViewsQuestions,
    noAnswersQuestions: getNoAnswersQuestions,
    getTags: getAllTags,
    getQuestion,
    getTagDetail,
    getUser,
  },
  Question: {
    answers: getAnswers,
    comments: getComments,
  },
  User: {
    questions: getUserQuestions,
    answers: getUserAnswers,
    clapItems: getUserClapItems,
  },
  Answer: {
    comments: getComments,
  },
};
preparePromise.then(() => {
  const server = new ApolloServer({ typeDefs, resolvers });
  const app = express();
  server.applyMiddleware({ app });
  app.listen({ port }, () => console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`));
});

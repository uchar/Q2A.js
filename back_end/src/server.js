require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const {
  getLatestQuestions,
  getPopularQuestions,
  getMostViewsQuestions,
  getNoAnswersQuestions,
  getQuestion,
  getAnswersCount,
  getAnswers,
  getComments,
  getUserAnswers,
  getUserClapItems,
  getUserQuestions,
} = require('./post');
const { getAllTags, getQuestionTags, getTagDetail } = require('./tag');
const { getUser, getUserAbout } = require('./user');

const port = 4000;

const typeDefs = gql`
  type User {
    id: String
    publicName: String
    profileImage: String
    description: String
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
    content: String
    count: Int
  }

  type Query {
    latestQuestions(tag: String): [Question]
    popularQuestions(tag: String): [Question]
    mostViewsQuestions(tag: String): [Question]
    noAnswersQuestions(tag: String): [Question]
    tags: [Tag]
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
    tags: getAllTags,
    getQuestion,
    getTagDetail,
    getUser,
  },
  Question: {
    tags: getQuestionTags,
    answers: getAnswers,
    comments: getComments,
    answersCount: getAnswersCount,
  },
  User: {
    questions: getUserQuestions,
    answers: getUserAnswers,
    clapItems: getUserClapItems,
    about: getUserAbout,
  },
  Answer: {
    comments: getComments,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port }, () => console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`));

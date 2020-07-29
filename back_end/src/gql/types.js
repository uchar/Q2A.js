const { gql } = require('apollo-server-express');

module.exports = gql`
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
  enum StatusCode {
    VALIDATION_ERROR
    OTHER_ERROR
    SUCCESS
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
  type Result {
    statusCode: StatusCode
    message: String
  }
  type Query {
    latestQuestions(tag: String, limit: Int, offset: Int): [Question]
    popularQuestions(tag: String, limit: Int, offset: Int): [Question]
    mostViewsQuestions(tag: String, limit: Int, offset: Int): [Question]
    noAnswersQuestions(tag: String, limit: Int, offset: Int): [Question]
    getTags(limit: Int, offset: Int): [Tag]
    getTagDetail(tag: String!): Tag
    getQuestion(id: String!): Question
    getUser(id: String): User
  }
  type Mutation {
    login(username: String!, password: String!): String
    googleLogin(jwtToken: String!): String
    signUp(email: String!, username: String!, password: String!): String
    addQuestion(title: String!, content: String!, tags: [String]!): Result
  }
`;

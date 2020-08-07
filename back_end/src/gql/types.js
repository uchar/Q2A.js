const { gql } = require('apollo-server-express');

module.exports = gql`
  enum AccessLevel {
    GUEST
    USER_CONFIRMED
    USER_NOT_CONFIRMED
    ADMIN
    SUPER_ADMIN
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

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  input UpdateUserInput {
    profileImage: String
    about: String
  }

  type User {
    id: String
    publicName: String
    profileImage: String
    score: Int
    about: String
    accessLevel: AccessLevel
    questions: [Question]
    answers: [Answer]
    clapItems: [ClapItem]
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
    isLegacyContent: Boolean
    answers: [Answer]
    comments: [Comment]
  }

  type Answer {
    id: String
    content: String
    user: User
    votesCount: Int
    isLegacyContent: Boolean
    createdAt: String
    comments: [Comment]
  }

  type Comment {
    id: String
    content: String
    user: User
    isLegacyContent: Boolean
    createdAt: String
  }

  type Tag {
    id: String
    title: String
    content: String
    used: Int
  }

  type Notification {
    id: String
    reason: String
    title: String
    content: String
    type: String
    metaData: String
    read: Boolean
    createdAt: String
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
    getNotifications(limit: Int!, offset: Int!): [Notification]
  }
  type Mutation {
    login(username: String!, password: String!): String
    googleLogin(jwtToken: String!): String
    signUp(email: String!, username: String!, password: String!): String
    addQuestion(title: String!, content: String!, tags: [String]!): Result
    addAnswer(postId: String!, content: String!): Result
    addComment(postId: String!, content: String!): Result
    updateQuestion(id: String!, title: String!, content: String!, tags: [String]!): Result
    updateAnswer(id: String!, content: String!): Result
    updateComment(id: String!, content: String!): Result
    uploadFile(file: Upload!): File!
    updateUser(input: UpdateUserInput!): Result
    setReadAllNotifications: Result
  }
`;

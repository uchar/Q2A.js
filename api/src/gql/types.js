import { gql } from 'apollo-server-express';

export default gql`
  enum Role {
    USER_CONFIRMED
    USER_NOT_CONFIRMED
    ADMIN
    SUPER_ADMIN
  }

  enum Language {
    en
    fa
  }

  enum Theme {
    light
    dark
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
    theme: Theme
    language: Language
  }

  type User {
    id: String!
    publicName: String
    profileImage: String
    score: Int
    about: String
    language: String
    theme: Theme
    role: Role
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
    id: String!
    title: String!
    content: String!
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
    active: Boolean!
  }

  type Answer {
    id: String!
    content: String!
    user: User
    votesCount: Int
    isLegacyContent: Boolean
    createdAt: String
    comments: [Comment]
    active: Boolean!
  }

  type Comment {
    id: String!
    content: String!
    user: User
    isLegacyContent: Boolean
    createdAt: String
    active: Boolean!
  }

  type Tag {
    id: String!
    title: String!
    content: String
    used: Int!
  }

  type Notification {
    id: String!
    creatorId: String!
    reason: String
    title: String!
    content: String
    type: String
    metaData: String
    read: Boolean!
    createdAt: String!
  }
  type Result {
    statusCode: StatusCode
    message: String
  }
  type AddResult {
    id: String!
    url: String
    statusCode: StatusCode!
  }

  type BlogPost {
    id: String!
    title: String!
    content: String!
    user: User!
    viewsCount: Int!
    votesCount: Int!
    commentsCount: Int!
    tag1: String
    tag2: String
    tag3: String
    tag4: String
    tag5: String
    comments: [Comment]
    createdAt: String!
    updatedAt: String!
    active: Boolean!
  }

  type Statistics {
    tagsCount: Int!
    allQuestionsCount: Int!
    usersCount: Int!
    blogPostsCount: Int!
  }

  type Query {
    latestQuestions(language: Language!, tag: String, limit: Int, offset: Int): [Question]
    popularQuestions(language: Language!, tag: String, limit: Int, offset: Int): [Question]
    mostViewsQuestions(language: Language!, tag: String, limit: Int, offset: Int): [Question]
    noAnswersQuestions(language: Language!, tag: String, limit: Int, offset: Int): [Question]
    getTags(language: Language!, limit: Int, offset: Int): [Tag]
    getTagDetail(language: Language!, tag: String!): Tag
    getQuestion(language: Language!, id: String!): Question
    getBlogPost(language: Language!, id: String!): BlogPost
    getUser(language: Language, id: String): User
    getNotifications(language: Language!, limit: Int!, offset: Int!): [Notification]
    getBlogPosts(language: Language!, limit: Int!, offset: Int!): [BlogPost]
    getStatistics(language: Language!): Statistics
  }

  type Mutation {
    login(language: Language!, username: String!, password: String!): String
    googleLogin(language: Language!, jwtToken: String!): String
    signUp(language: Language!, email: String!, username: String!, password: String!): String
    addQuestion(language: Language!, title: String!, content: String!, tags: [String]!): AddResult
    addBlogPost(language: Language!, title: String!, content: String!, tags: [String]!): AddResult
    addAnswer(language: Language!, postId: String!, content: String!): AddResult
    addComment(language: Language!, postId: String!, content: String!): AddResult
    addBlogComment(language: Language!, postId: String!, content: String!): AddResult
    updateQuestion(
      language: Language!
      id: String!
      title: String!
      content: String!
      tags: [String]!
    ): Result
    updateBlogPost(
      language: Language!
      id: String!
      title: String!
      content: String!
      tags: [String]!
    ): Result
    updateAnswer(language: Language!, id: String!, content: String!): Result
    updateComment(language: Language!, id: String!, content: String!): Result
    #    uploadFile(language: Language!, file: Upload!): File!
    updateUser(id: String!, input: UpdateUserInput!): Result
    setReadAllNotifications(language: Language!): Result
    increaseViewCount(language: Language!, id: String!): Result
    togglePostActiveStatus(language: Language!, id: String!): Result
  }
`;

import gql from 'graphql-tag';

const userType = `user :{
      id
      profileImage
      publicName
      score
    }`;
const QUESTION = `{
    id
    title
    content
    viewsCount
    votesCount
    answersCount
    ${userType}
    createdAt
    tag1
    tag2
    tag3
    tag4
    tag5
    isLegacyContent
  }`;

export const ALL_QUESTIONS = gql`
  query($tag: String) {
    latestQuestions(tag: $tag,limit: 30,offset: 0) ${QUESTION}
    popularQuestions(tag: $tag,limit: 30,offset: 0)  ${QUESTION}
    mostViewsQuestions(tag: $tag,limit: 30,offset: 0)  ${QUESTION}
    noAnswersQuestions(tag: $tag,limit: 30,offset: 0)  ${QUESTION}
  }
`;

export const GET_QUESTION = gql`
  query($id: String!) {
    getQuestion(id: $id) {
      id
      title
      content
      viewsCount
      votesCount
      answersCount
      createdAt
      ${userType}
      createdAt
      tag1
      tag2
      tag3
      tag4
      tag5
      isLegacyContent
      answers {
        id
        content
        ${userType}
        isLegacyContent
        votesCount
        createdAt
        comments {
          id
          content
          isLegacyContent
          ${userType}
          createdAt
        }
      }
      comments {
        id
        content
        isLegacyContent
        ${userType}
        createdAt
      }
    }
  }
`;

export const ALL_TAGS = gql`
  query {
    getTags(limit: 80, offset: 0) {
      id
      title
      used
    }
  }
`;

export const GET_TAG = gql`
  query($tag: String!) {
    getTagDetail(tag: $tag) {
      id
      title
      content
      used
    }
  }
`;

export const GET_NOTIFICATIONS = gql`
  query($limit: Int!, $offset: Int!) {
    getNotifications(limit: $limit, offset: $offset) {
      id
      title
      content
      metaData
      read
    }
  }
`;

export const GET_MY_USER = gql`
  query {
    getUser {
      id
      publicName
      profileImage
      score
    }
  }
`;

export const GET_USER = gql`
  query($id: String!) {
    getUser(id: $id) {
      id
      publicName
      score
      profileImage
      about
      answers {
        id
        content
        votesCount
        createdAt
      }
      questions {
        id
        title
        content
        viewsCount
        votesCount
        answersCount
        createdAt
        tag1
        tag2
        tag3
        tag4
        tag5
        isLegacyContent
      }
      clapItems {
        type
        answer {
          id
          content
          ${userType}
          isLegacyContent
          votesCount
          createdAt
        }
        question {
          id
          title
          content
          viewsCount
          votesCount
          answersCount
          ${userType}
          createdAt
          tag1
          tag2
          tag3
          tag4
          tag5
          isLegacyContent
        }
      }
    }
  }
`;

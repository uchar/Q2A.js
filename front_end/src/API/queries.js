import gql from 'graphql-tag';

const userType = `user {
      id
      profileImage
      publicName
      score
      language
      theme
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
  }`;

export const ALL_QUESTIONS = gql`
  query($language:Language!,$tag: String) {
    latestQuestions(language: $language,tag: $tag,limit: 20,offset: 0) ${QUESTION}
    popularQuestions(language: $language,tag: $tag,limit: 20,offset: 0)  ${QUESTION}
    mostViewsQuestions(language: $language,tag: $tag,limit: 20,offset: 0)  ${QUESTION}
    noAnswersQuestions(language: $language,tag: $tag,limit: 20,offset: 0)  ${QUESTION}
  }
`;

export const GET_QUESTION = gql`
  query($language:Language!,$id: String!) {
    getQuestion(language: $language,id: $id) {
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
      answers {
        id
        content
        ${userType}
        votesCount
        createdAt
        comments {
          id
          content
          ${userType}
          createdAt
        }
      }
      comments {
        id
        content
        ${userType}
        createdAt
      }
    }
  }
`;

export const ALL_TAGS = gql`
  query($language: Language!, $limit: Int, $offset: Int) {
    getTags(language: $language, limit: $limit, offset: $offset) {
      id
      title
      content
      used
    }
  }
`;

export const ALL_BLOG_POSTS = gql`
  query($language: Language!, $limit: Int!, $offset: Int!) {
    getBlogPosts(language: $language, limit: $limit, offset: $offset) {
      id
      title
      content
      ${userType}
      viewsCount
      votesCount
      commentsCount
      tag1
      tag2
      tag3
      tag4
      tag5
      createdAt
      updatedAt
    }
  }
`;

export const GET_TAG = gql`
  query($language: Language!, $tag: String!) {
    getTagDetail(language: $language, tag: $tag) {
      id
      title
      content
      used
    }
  }
`;

export const GET_NOTIFICATIONS = gql`
  query($language: Language!, $limit: Int!, $offset: Int!) {
    getNotifications(language: $language, limit: $limit, offset: $offset) {
      id
      reason
      title
      content
      type
      metaData
      read
      createdAt
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
      theme
    }
  }
`;

export const GET_USER = gql`
  query($language:Language,$id: String) {
    getUser(language:$language,id: $id) {
      id
      publicName
      score
      profileImage
      about
      theme
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
      }
      clapItems {
        type
        answer {
          id
          content
          ${userType}
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
        }
      }
    }
  }
`;

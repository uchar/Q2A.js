import gql from 'graphql-tag';

const QUESTION = `{
    id
    title
    content
    viewsCount
    votesCount
    answersCount
    user {
      profileImage
      publicName
    }
    createdAt
    tag1
    tag2
    tag3
    tag4
    tag5
  }`;

export const ALL_QUESTIONS = gql`
  query getAllQuestions($tag: String) {
    latestQuestions(tag: $tag,limit: 30,offset: 0) ${QUESTION}
    popularQuestions(tag: $tag,limit: 30,offset: 0)  ${QUESTION}
    mostViewsQuestions(tag: $tag,limit: 30,offset: 0)  ${QUESTION}
    noAnswersQuestions(tag: $tag,limit: 30,offset: 0)  ${QUESTION}
  }
`;

export const GET_QUESTION = gql`
  query getQuestion($id: String!) {
    getQuestion(id: $id) {
      id
      title
      content
      viewsCount
      votesCount
      answersCount
      createdAt
      user {
        profileImage
        publicName
      }
      createdAt
      tag1
      tag2
      tag3
      tag4
      tag5
      answers {
        id
        content
        user {
          profileImage
          publicName
        }
        votesCount
        createdAt
        comments {
          id
          content
          user {
            profileImage
            publicName
          }
          createdAt
        }
      }
      comments {
        id
        content
        user {
          profileImage
          publicName
        }
        createdAt
      }
    }
  }
`;

export const ALL_TAGS = gql`
  query q {
    getTags(limit: 80, offset: 0) {
      id
      title
      used
    }
  }
`;

export const GET_TAG = gql`
  query q($tag: String!) {
    getTagDetail(tag: $tag) {
      id
      title
      content
      used
    }
  }
`;

export const GET_MY_USER = gql`
  query getUser {
    getUser {
      publicName
      profileImage
    }
  }
`;

export const GET_USER = gql`
  query getUser($id: String!) {
    getUser(id: $id) {
      publicName
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
      }
      clapItems {
        type
        answer {
          id
          content
          user {
            profileImage
            publicName
          }
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
          user {
            profileImage
            publicName
          }
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

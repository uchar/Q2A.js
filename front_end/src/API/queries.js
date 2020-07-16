import gql from 'graphql-tag';

export const ALL_QUESTIONS = gql`
  query q {
    questions {
      id
      title
      content
      profileImage
      creator
      createdAt
      tags {
        title
      }
    }
  }
`;

export const GET_QUESTION = gql`
  query getQuestion($id: String!) {
    getQuestion(id: $id) {
      id
      title
      content
      profileImage
      creator
      createdAt
      tags {
        title
      }
      answers {
        id
        content
        profileImage
        creator
        createdAt
        comments {
          id
          content
          profileImage
          creator
          createdAt
        }
      }
      comments {
        id
        content
        profileImage
        creator
        createdAt
      }
    }
  }
`;

export const ALL_TAGS = gql`
  query q {
    tags {
      id
      title
      count
    }
  }
`;

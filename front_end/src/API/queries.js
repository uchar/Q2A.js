import gql from 'graphql-tag';

export const ALL_QUESTIONS = gql`
  query q {
    questions {
      id
      title
      content
    }
  }
`;

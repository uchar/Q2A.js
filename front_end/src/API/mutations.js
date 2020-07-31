import gql from 'graphql-tag';

export const ADD_QUESTION = gql`
  mutation addQuestion($title: String!, $content: String!, $tags: [String]!) {
    addQuestion(title: $title, content: $content, tags: $tags) {
      statusCode
      message
    }
  }
`;

export const USER_LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

export const USER_GOOGLE_LOGIN = gql`
  mutation googleLogin($jwtToken: String!) {
    googleLogin(jwtToken: $jwtToken)
  }
`;

export const USER_SIGN_UP = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;

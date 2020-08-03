import gql from 'graphql-tag';

export const ADD_QUESTION = gql`
  mutation($title: String!, $content: String!, $tags: [String]!) {
    addQuestion(title: $title, content: $content, tags: $tags) {
      statusCode
      message
    }
  }
`;

export const ADD_ANSWER = gql`
  mutation($postId: String!, $content: String!) {
    addAnswer(postId: $postId, content: $content) {
      statusCode
      message
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation($postId: String!, $content: String!) {
    addComment(postId: $postId, content: $content) {
      statusCode
      message
    }
  }
`;

export const UPDATE_QUESTION = gql`
  mutation($id: String!, $title: String!, $content: String!, $tags: [String]!) {
    addQuestion(id: $id, title: $title, content: $content, tags: $tags) {
      statusCode
      message
    }
  }
`;

export const USER_LOGIN = gql`
  mutation($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

export const USER_GOOGLE_LOGIN = gql`
  mutation($jwtToken: String!) {
    googleLogin(jwtToken: $jwtToken)
  }
`;

export const USER_SIGN_UP = gql`
  mutation($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;
export const UPLOAD_FILE = gql`
  mutation($file: Upload!) {
    uploadFile(file: $file) {
      filename
      mimetype
      encoding
    }
  }
`;

export const UPDATE_USER = gql`
  mutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
      statusCode
      message
    }
  }
`;

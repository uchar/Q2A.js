import gql from 'graphql-tag';

export const ADD_QUESTION = gql`
  mutation($language: Language!, $title: String!, $content: String!, $tags: [String]!) {
    addQuestion(language: $language, title: $title, content: $content, tags: $tags) {
      id
      url
      statusCode
    }
  }
`;

export const increaseViewCount = gql`
  mutation($language: Language!, $id: String!) {
    increaseViewCount(language: $language, id: $id) {
      statusCode
      message
    }
  }
`;
export const ADD_ANSWER = gql`
  mutation($language: Language!, $postId: String!, $content: String!) {
    addAnswer(language: $language, postId: $postId, content: $content) {
      id
      url
      statusCode
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation($language: Language!, $postId: String!, $content: String!) {
    addComment(language: $language, postId: $postId, content: $content) {
      id
      url
      statusCode
    }
  }
`;
export const UPDATE_QUESTION = gql`
  mutation($language: Language!, $id: String!, $title: String!, $content: String!, $tags: [String]!) {
    updateQuestion(language: $language, id: $id, title: $title, content: $content, tags: $tags) {
      statusCode
      message
    }
  }
`;

export const UPDATE_ANSWER = gql`
  mutation($language: Language!, $id: String!, $content: String!) {
    updateAnswer(language: $language, id: $id, content: $content) {
      statusCode
      message
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation($language: Language!, $id: String!, $content: String!) {
    updateComment(language: $language, id: $id, content: $content) {
      statusCode
      message
    }
  }
`;

export const USER_LOGIN = gql`
  mutation($language: Language!, $username: String!, $password: String!) {
    login(language: $language, username: $username, password: $password)
  }
`;

export const USER_GOOGLE_LOGIN = gql`
  mutation($language: Language!, $jwtToken: String!) {
    googleLogin(language: $language, jwtToken: $jwtToken)
  }
`;

export const USER_SIGN_UP = gql`
  mutation($language: Language!, $email: String!, $username: String!, $password: String!) {
    signUp(language: $language, email: $email, username: $username, password: $password)
  }
`;
export const UPLOAD_FILE = gql`
  mutation($language: Language!, $file: Upload!) {
    uploadFile(language: $language, file: $file) {
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

export const SET_READ_ALL_NOTIFICATIONS = gql`
  mutation($language: Language!) {
    setReadAllNotifications(language: $language) {
      statusCode
      message
    }
  }
`;

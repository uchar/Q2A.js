import { GET_MY_USER } from './queries';
import { USER_LOGIN, USER_GOOGLE_LOGIN, USER_SIGN_UP } from './mutations';

import getStandaloneApolloClient from '../apolloClient';

export const doGraphQLQuery = async (query, params) => {
  let jwtToken;
  if (process.browser) {
    jwtToken = await localStorage.getItem('JWT_TOKEN');
  }
  const client = getStandaloneApolloClient(jwtToken);
  const result = await client.query({ query, variables: params });
  return result.data;
};

export const doGraphQLMutation = async (mutation, params) => {
  let jwtToken;
  if (process.browser) {
    jwtToken = await localStorage.getItem('JWT_TOKEN');
  }
  const client = getStandaloneApolloClient(jwtToken);
  const result = await client.mutate({ mutation, variables: params });
  return result.data;
};

export const login = async (username, password) => {
  const client = getStandaloneApolloClient();
  const result = await client.mutate({ mutation: USER_LOGIN, variables: { username, password } });
  const jwtToken = result.data.login;
  await localStorage.setItem('JWT_TOKEN', jwtToken);
  return jwtToken;
};

export const loginWithGoogle = async (googleJwtToken) => {
  const client = getStandaloneApolloClient();
  const result = await client.mutate({
    mutation: USER_GOOGLE_LOGIN,
    variables: { jwtToken: googleJwtToken },
  });
  const jwtToken = result.data.googleLogin;
  await localStorage.setItem('JWT_TOKEN', jwtToken);
  return jwtToken;
};

export const signUp = async (email, username, password) => {
  const client = getStandaloneApolloClient();
  const result = await client.mutate({ mutation: USER_SIGN_UP, variables: { email, username, password } });
  const jwtToken = result.data.signUp;
  await localStorage.setItem('JWT_TOKEN', jwtToken);
  return jwtToken;
};

export const checkUser = async () => {
  const jwtToken = localStorage.getItem('JWT_TOKEN');
  if (jwtToken) {
    try {
      const result = await doGraphQLQuery(GET_MY_USER);
      return result.getUser;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  return false;
};

import { GET_MY_USER, USER_LOGIN } from './queries';
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
export const login = async (username, password) => {
  const client = getStandaloneApolloClient();
  const result = await client.mutate({ mutation: USER_LOGIN, variables: { username, password } });
  const jwtToken = result.data.login;
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

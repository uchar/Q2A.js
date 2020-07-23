import { USER_LOGIN } from './queries';
import getStandaloneApolloClient from '../apolloClient';

export const doGraphQLQuery = async (query, params, useJWTHeader) => {
  const client = getStandaloneApolloClient();
  const result = await client.query({ query, variables: params });
  return result.data;
};
export const login = async (username, password) => {
  const client = getStandaloneApolloClient();
  return client.query({ query: USER_LOGIN, variables: { username, password } });
};

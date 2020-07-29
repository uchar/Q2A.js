import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import fetch from 'isomorphic-unfetch';

const getStandaloneApolloClient = (jwtToken) => {
  const headers = {};
  if (jwtToken) headers.authorization = `Bearer ${jwtToken}`;
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
      fetch,
      headers,
    }),
    cache: new InMemoryCache(),
  });
};
export default getStandaloneApolloClient;

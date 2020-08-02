import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'isomorphic-unfetch';
import { createUploadLink } from 'apollo-upload-client'

const getStandaloneApolloClient = (jwtToken) => {
  const headers = {};
  if (jwtToken) headers.authorization = `Bearer ${jwtToken}`;
  return new ApolloClient({
    link: createUploadLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
      fetch,
      headers,
    }),
    cache: new InMemoryCache(),
  });
};
export default getStandaloneApolloClient;

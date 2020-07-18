import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';

export default function createApolloClient(initialState, ctx) {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  console.log('Graphql url : ', process.env.NEXT_PUBLIC_GRAPHQL_URL);
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_URL
        ? process.env.NEXT_PUBLIC_GRAPHQL_URL
        : 'https://7khatcode-api.liara.run/graphql', // Seems that liara doesn't support env variable in next.js
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
      fetch,
    }),
    cache: new InMemoryCache().restore(initialState),
  });
}

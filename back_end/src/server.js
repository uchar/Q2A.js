import 'dotenv/config.js';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import createDatabasePromise from './db/createDatabase.js';
import resolvers from './gql/resolvers.js';
import types from './gql/types.js';

const port = 4000;
const path = '/graphql';

createDatabasePromise.then(() => {
  const { Strategy, ExtractJwt } = passportJWT;

  const jwtPasswordStrategy = new Strategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    (payload, done) => {
      const user = payload;
      return done(null, user);
    }
  );

  passport.use(jwtPasswordStrategy);
  passport.initialize();

  const app = express();
  app.use(path, (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (user) {
        req.user = user;
      }
      next();
    })(req, res, next);
  });

  const server = new ApolloServer({
    typeDefs: types,
    resolvers,
    context: ({ req }) => ({
      user: req.user,
    }),
  });
  server.applyMiddleware({ app, path });
  app.listen({ port }, () => console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`));
});

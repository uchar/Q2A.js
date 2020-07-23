require('dotenv').config();
const passport = require('passport');
const passportJWT = require('passport-jwt');
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const { preparePromise } = require('./db/dbPrepare');
const resolvers = require('./gql/resolvers');
const types = require('./gql/types');

const port = 4000;
const path = '/graphql';

preparePromise.then(() => {
  const { Strategy, ExtractJwt } = passportJWT;

  const params = {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };
  const strategy = new Strategy(params, (payload, done) => {
    const user = payload;
    return done(null, user);
  });

  passport.use(strategy);
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

import jwt from 'jsonwebtoken';
import { GET_MY_USER } from './queries';
import { UPDATE_USER, UPLOAD_FILE, USER_GOOGLE_LOGIN, USER_LOGIN, USER_SIGN_UP } from './mutations';

import getStandaloneApolloClient from '../apolloClient';
import { getLanguage } from '../common/utlities/languageUtilities';

const getJwtToken = () => {
  let jwtToken;
  if (process.browser) {
    jwtToken = localStorage.getItem('JWT_TOKEN');
    if (jwtToken) {
      const decodedToken = jwt.decode(jwtToken, { complete: true });
      const expiredAt = decodedToken.payload.exp;
      const currentTime = Math.floor(new Date().getTime() / 1000);
      // If less than 30 minutes left in session
      if (currentTime + 60 * 30 >= expiredAt) {
        jwtToken = undefined;
        localStorage.removeItem(jwtToken);
      }
    }
  }
  return jwtToken;
};

const doGraphQLQuery = async (query, params) => {
  const jwtToken = getJwtToken();
  const client = getStandaloneApolloClient(jwtToken);
  const variables = { language: getLanguage(), ...params };
  const result = await client.query({ query, variables });
  return result.data;
};

const doGraphQLMutation = async (mutation, params, addLanguage = true) => {
  const jwtToken = getJwtToken();
  const client = getStandaloneApolloClient(jwtToken);
  const variables = addLanguage ? { language: getLanguage(), ...params } : params;
  const result = await client.mutate({ mutation, variables });
  return result.data;
};

const login = async (username, password) => {
  const client = getStandaloneApolloClient();
  const result = await client.mutate({
    mutation: USER_LOGIN,
    variables: { language: getLanguage(), username, password },
  });
  const jwtToken = result.data.login;
  await localStorage.setItem('JWT_TOKEN', jwtToken);
  return jwtToken;
};

const loginWithGoogle = async (googleJwtToken) => {
  const client = getStandaloneApolloClient();
  const result = await client.mutate({
    mutation: USER_GOOGLE_LOGIN,
    variables: { language: getLanguage(), jwtToken: googleJwtToken },
  });
  const jwtToken = result.data.googleLogin;
  await localStorage.setItem('JWT_TOKEN', jwtToken);
  return jwtToken;
};

const signUp = async (email, username, password) => {
  const client = getStandaloneApolloClient();
  const result = await client.mutate({
    mutation: USER_SIGN_UP,
    variables: { language: getLanguage(), email, username, password },
  });
  const jwtToken = result.data.signUp;
  await localStorage.setItem('JWT_TOKEN', jwtToken);
  return jwtToken;
};

// load locally if USER key exist in asyncstorage nad force refresh is false
const getCurrentUser = async () => {
  // for logout
  // localStorage.removeItem('JWT_TOKEN');
  // localStorage.removeItem('USER');
  const jwtToken = getJwtToken();
  if (jwtToken) {
    try {
      const user = localStorage.getItem('USER');
      if (user) {
        return JSON.parse(user);
      }
      const result = await doGraphQLQuery(GET_MY_USER);
      await localStorage.setItem('USER', JSON.stringify(result.getUser));
      return result.getUser;
    } catch (error) {
      return false;
    }
  }
  return false;
};

const uploadFile = async (file) => {
  return doGraphQLMutation(UPLOAD_FILE, { file });
};

const getCurrentUserId = async () => {
  const user = await getCurrentUser();
  if (user) return user.id;
  return '';
};
const updateCurrentUser = async (params) => {
  await doGraphQLMutation(UPDATE_USER, { id: await getCurrentUserId(), input: { ...params } }, false);
  await localStorage.removeItem('USER');
  return getCurrentUser();
};

const isSignedIn = () => {
  const jwtToken = getJwtToken();
  if (jwtToken) return true;
  return false;
};
const USER_ACTIONS = {
  EDIT_POST: 'EDIT_POST',
  DISABLE_POST: 'DISABLE_POST',
  ASK_QUESTION: 'ASK_QUESTION',
};
const USER_ROLE = {
  USER_CONFIRMED: 'USER_CONFIRMED',
  USER_NOT_CONFIRMED: 'USER_NOT_CONFIRMED',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
};
const isAdminOrMore = (user) => {
  return user.role === USER_ROLE.ADMIN || user.role === USER_ROLE.SUPER_ADMIN;
};

// eslint-disable-next-line complexity
const isAccessLevelEnough = async (action, itemsUserId) => {
  const user = await getCurrentUser();
  if (!user) return false;
  if (isAdminOrMore(user)) return true;
  if (action === USER_ACTIONS.EDIT_POST || action === USER_ACTIONS.DISABLE_POST) {
    if (user.id === itemsUserId) return true;
  }
  return false;
};

export {
  updateCurrentUser,
  getCurrentUserId,
  uploadFile,
  getCurrentUser,
  signUp,
  login,
  loginWithGoogle,
  doGraphQLMutation,
  doGraphQLQuery,
  isSignedIn,
  USER_ACTIONS,
  isAccessLevelEnough,
};

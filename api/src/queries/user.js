import { findUserByName, createAuthorizationErrorResponse } from '../utility.js';

const getUser = async (_, params, context) => {
  if (!params.id && !context.user) {
    createAuthorizationErrorResponse();
  }
  const id = params.id ? params.id : context.user.publicName;
  return findUserByName(id);
};

export { getUser };

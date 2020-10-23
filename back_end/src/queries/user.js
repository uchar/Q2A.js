import { findUserByName } from '../utility.js';

const getUser = async (_, params, context) => {
  if (!params.id && !context.user) {
    throw new Error("You're not authorized");
  }
  const id = params.id ? params.id : context.user.publicName;
  return findUserByName(id);
};

export { getUser };

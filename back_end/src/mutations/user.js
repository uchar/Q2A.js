import databaseUtils from '../db/database.js';
import { TABLES } from '../db/constants.js';
import { createSuccessResponse } from '../utility.js';

const updateUser = async (_, { input }, context) => {
  if (!context.user) {
    throw new Error("You're not authorized");
  }
  const User = databaseUtils().loadModel(TABLES.USER_TABLE);
  await User.update(
    {
      ...input,
    },
    { where: { id: context.user.id } }
  );
  return createSuccessResponse();
};

export { updateUser };

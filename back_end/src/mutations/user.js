import databaseUtils from '../db/database.js';
import { TABLES } from '../db/constants.js';
import { createSuccessResponse, createErrorResponse } from '../utility.js';

const updateUser = async (_, { input }, context) => {
  if (!context.user) {
    throw new Error("You're not authorized");
  }
  if (input.language === 'fa' || input.language === 'en') {
    const User = databaseUtils.loadModel(TABLES.USER_TABLE);
    await User.update(
      {
        ...input,
      },
      {
        where: { id: context.user.id },
      }
    );
    return createSuccessResponse();
  }
  return createErrorResponse('gffdgsfg');
  // throw new Error('Language should be fa or en');
};

export { updateUser };

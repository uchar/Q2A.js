const database = require('../db/database').getDatabase();
const tables = require('../db/constants').TABLES;
const { createSuccessResponse, createErrorResponse } = require('../utility');

module.exports.updateUser = async (_, { input }, context) => {
  if (!context.user) {
    throw new Error("You're not authorized");
  }
  if (input.language === 'fa' || input.language === 'en') {
    const User = database.loadModel(tables.USER_TABLE);
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

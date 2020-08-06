const database = require('../db/database').getDatabase();
const tables = require('../db/constants').TABLES;
const { createSuccessResponse } = require('../utility');

module.exports.updateUser = async (_, { input }, context) => {
  if (!context.user) {
    throw new Error("You're not authorized");
  }
  const User = database.loadModel(tables.USER_TABLE);
  await User.update(
    {
      ...input,
    },
    { where: { id: context.user.id } }
  );
  return createSuccessResponse();
};

module.exports.setReadAllNotification = async (_, __, context) => {
  if (!context.user) {
    throw new Error("You're not authorized");
  }
  const Notifications = database.loadModel(tables.NOTIFICATION_TABLE);
  await Notifications.update(
    {
      read: true,
    },
    { where: { id: context.user.id } }
  );
  return createSuccessResponse();
};

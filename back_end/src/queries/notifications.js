const database = require('../db/database').getDatabase();
const tables = require('../db/constants').TABLES;

module.exports.getNotifications = async (_, { limit, offset }, context) => {
  if (!context.user) {
    throw new Error("You're not authorized");
  }
  const Notification = await database.loadModel(tables.NOTIFICATION_TABLE);
  const { id } = context.user;
  return Notification.findAll({
    where: { userId: id },
    order: [['createdAt', 'DESC']],
    limit,
    offset,
  });
};

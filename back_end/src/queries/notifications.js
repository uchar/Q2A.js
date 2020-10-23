import databaseUtils from '../db/database.js';
import { TABLES } from '../db/constants.js';

const getNotifications = async (_, { limit, offset }, context) => {
  if (!context.user) {
    throw new Error("You're not authorized");
  }
  const Notification = await databaseUtils().loadModel(TABLES.NOTIFICATION_TABLE);
  const { id } = context.user;
  return Notification.findAll({
    where: { userId: id },
    order: [['createdAt', 'DESC']],
    limit,
    offset,
  });
};

export { getNotifications };

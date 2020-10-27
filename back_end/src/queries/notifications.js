import databaseUtils from '../db/database.js';
import { TABLES } from '../constants.js';
import { createAuthorizationErrorResponse } from '../utility';

const getNotifications = async (_, { limit, offset }, context) => {
  if (!context.user) {
    createAuthorizationErrorResponse();
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

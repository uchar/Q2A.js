import databaseUtils from '../db/database.js';
import { TABLES } from '../constants.js';
import { createAuthorizationErrorResponse } from '../utility.js';

const getNotifications = async (_, { language, limit, offset }, context) => {
  if (!context.user) {
    createAuthorizationErrorResponse();
  }
  const Notification = await databaseUtils().loadModel(TABLES.NOTIFICATION_TABLE);
  const { id } = context.user;
  return Notification.findAll({
    where: { receiverId: id, language },
    order: [['createdAt', 'DESC']],
    limit,
    offset,
  });
};

export { getNotifications };

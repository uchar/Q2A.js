import databaseUtils from '../db/database.js';
import { TABLES } from '../constants.js';
import { createSuccessResponse, createAuthorizationErrorResponse } from '../utility.js';

export const NOTIFICATION_REASON = {
  QUESTION_CLAPPED: 'QUESTION_CLAPPED',
  ANSWER_CLAPPED: 'ANSWER_CLAPPED',
  COMMENT_CLAPPED: 'COMMENT_CLAPPED',
  ANSWER_RECEIVED: 'ANSWER_RECEIVED',
  COMMENT_RECEIVED: 'COMMENT_RECEIVED',
  QUESTION_HIDED: 'QUESTION_HIDED',
  ANSWER_HIDED: 'ANSWER_HIDED',
  COMMENT_HIDED: 'COMMENT_HIDED',
};

const saveNotification = async (reason, creatorId, receiverId, title, content, metaData) => {
  const Notification = databaseUtils().loadModel(TABLES.NOTIFICATION_TABLE);
  console.log('Notifications:', reason, title, content, metaData, creatorId, receiverId);
  console.log('model:', Notification);
  await Notification.create({
    reason,
    title,
    content,
    metaData: JSON.stringify(metaData),
    creatorId,
    receiverId,
  });
};

const setReadAllNotifications = async (_, __, context) => {
  if (!context.user) {
    createAuthorizationErrorResponse();
  }
  const Notifications = databaseUtils().loadModel(TABLES.NOTIFICATION_TABLE);
  await Notifications.update(
    {
      read: true,
    },
    { where: { userId: context.user.id } }
  );
  return createSuccessResponse();
};

export { saveNotification, setReadAllNotifications };

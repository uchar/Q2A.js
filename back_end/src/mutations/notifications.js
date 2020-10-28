import * as yup from 'yup';
import databaseUtils from '../db/database.js';
import { TABLES } from '../constants.js';
import { createSuccessResponse, createAuthorizationErrorResponse, checkInputValidation } from '../utility.js';

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
  const notificationSchema = await yup.object().shape({
    reason: yup.string(),
    title: yup.string().required(),
    content: yup.string(),
    metaData: yup.string(),
  });
  const validationResult = await checkInputValidation(
    notificationSchema,
    { reason, title, content, metaData },
    { user: { id: creatorId } }
  );
  if (validationResult === true) {
    const Notification = databaseUtils().loadModel(TABLES.NOTIFICATION_TABLE);
    await Notification.create({
      reason,
      creatorId,
      receiverId,
      title,
      content,
      metaData: JSON.stringify(metaData),
    });
  }
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
    { where: { receiverId: context.user.id } }
  );
  return createSuccessResponse();
};

export { saveNotification, setReadAllNotifications };

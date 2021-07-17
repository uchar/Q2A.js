import * as yup from 'yup';
import databaseUtils from '../db/database.js';
import { LANGUAGE, TABLES } from '../constants.js';
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

const saveNotification = async (language, reason, creatorId, receiverId, title, content, metaData) => {
  const notificationSchema = await yup.object().shape({
    reason: yup.string(),
    title: yup.string().required(),
    content: yup.string(),
    language: yup.mixed().oneOf([LANGUAGE.PERSIAN, LANGUAGE.ENGLISH]).required(),
  });
  const validationResult = await checkInputValidation(notificationSchema, {
    language,
    reason,
    title,
    content,
  });
  if (validationResult === true) {
    const Notification = databaseUtils().loadModel(TABLES.NOTIFICATION_TABLE);
    await Notification.create({
      reason,
      creatorId,
      receiverId,
      title,
      content,
      language,
      metaData: JSON.stringify(metaData),
    });
  } else {
    console.error(validationResult);
  }
};

const setReadAllNotifications = async (_, { language }, context) => {
  if (!context.user) {
    createAuthorizationErrorResponse();
  }
  const Notifications = databaseUtils().loadModel(TABLES.NOTIFICATION_TABLE);
  await Notifications.update(
    {
      read: true,
    },
    { where: { language, receiverId: context.user.id } }
  );
  return createSuccessResponse();
};

export { saveNotification, setReadAllNotifications };

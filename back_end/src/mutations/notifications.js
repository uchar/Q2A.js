const database = require('../db/database').getDatabase();
const tables = require('../db/constants').TABLES;

module.exports.NOTIFICATION_REASON = {
  QUESTION_CLAPPED: 'QUESTION_CLAPPED',
  ANSWER_CLAPPED: 'ANSWER_CLAPPED',
  COMMENT_CLAPPED: 'COMMENT_CLAPPED',
  ANSWER_RECEIVED: 'ANSWER_RECEIVED',
  COMMENT_RECEIVED: 'COMMENT_RECEIVED',
  QUESTION_HIDED: 'QUESTION_HIDED',
  ANSWER_HIDED: 'ANSWER_HIDED',
  COMMENT_HIDED: 'COMMENT_HIDED',
};

module.exports.saveNotification = async (reason, userId, title, content, metaData) => {
  const Notification = database.loadModel(tables.NOTIFICATION_TABLE);
  await Notification.create({ reason, userId, title, content, metaData: JSON.stringify(metaData) });
};

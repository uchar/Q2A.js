import {
  saveNotification,
  NOTIFICATION_REASON,
  setReadAllNotifications,
} from '../../mutations/notifications';
import databaseUtils from '../../db/database';
import { STATUS_CODE, TABLES } from '../../constants';

describe('notification api', () => {
  const createUser = async (publicName = 'test_name', email = 'test@test.com') => {
    const User = await databaseUtils().loadModel(TABLES.USER_TABLE);
    const user = await User.create({
      publicName,
      email,
      isEmailVerified: true,
    });
    return user;
  };

  const data = {
    reason: NOTIFICATION_REASON.ANSWER_CLAPPED,
    title: 'title',
    content: 'content',
    metaData: 'metaData',
    type: 'ok',
    read: false,
    language: 'en',
  };

  test('if correct input for mutation/notification/saveNotification should give success', async () => {
    const creatorUser = await createUser('user_name_creator', 'test_user_creator@test.com');
    const receiverUser = await createUser('user_name_receiver', 'test_user_receiver@test.com');

    await saveNotification(
      data.language,
      data.reason,
      creatorUser.id,
      receiverUser.id,
      data.title,
      data.content,
      data.metaData,
      data.type,
      data.read
    );
    const findNotificationByReceiverId = async (receiverId) => {
      return global.Notification.findOne({
        where: {
          receiverId,
        },
      });
    };
    const notification = await findNotificationByReceiverId(receiverUser.id);
    expect(notification.receiverId).toBe(receiverUser.id);
    expect(notification.reason).toBe(data.reason);
    expect(notification.creatorId).toBe(creatorUser.id);
    expect(notification.title).toBe(data.title);
    expect(notification.read).toBe(false);
  });

  test('if read all notifications works', async () => {
    const receiverUser = await createUser('user_name_receiver', 'test_user_receiver@test.com');
    const creatorUser = await createUser(`user_name_creator$`, 'test_user_creator@test.com');
    const promises = [];
    const numberOfTests = 6;
    for (let i = 0; i < numberOfTests; i += 1) {
      promises.push(
        saveNotification(
          data.language,
          data.reason,
          creatorUser.id,
          receiverUser.id,
          data.title,
          data.content,
          data.metaData,
          data.type,
          data.read
        )
      );
    }
    await Promise.all(promises);

    const findNotificationByReceiverId = async (receiverId) => {
      return global.Notification.findAll({
        where: {
          receiverId,
        },
      });
    };
    const setReadAllResult = await setReadAllNotifications(
      null,
      { language: data.language },
      { user: { id: receiverUser.id } }
    );
    const findNotificationResult = await findNotificationByReceiverId(receiverUser.id);
    expect(setReadAllResult.statusCode).toBe(STATUS_CODE.SUCCESS);
    for (let j = 0; j < numberOfTests; j += 1) {
      expect(findNotificationResult[j].read).toBe(true);
    }
  });
});

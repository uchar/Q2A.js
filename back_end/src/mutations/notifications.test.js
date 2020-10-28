import { saveNotification, NOTIFICATION_REASON, setReadAllNotifications } from './notifications';
import databaseUtils from '../db/database';
import { STATUS_CODE, TABLES } from '../constants';

describe('how notification graphql api work', () => {
  const createUser = async (publicName = 'test_name', email = 'test@test.com', language = 'fa') => {
    const User = await databaseUtils().loadModel(TABLES.USER_TABLE);
    const user = await User.create({
      publicName,
      email,
      language,
      isLegacyAuthentication: false,
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
  };
  test('if correct input for mutation/notification/saveNotification should give success', async () => {
    const creatorUser = await createUser('user_name_creator', 'test_user_creator@test.com');
    const receiverUser = await createUser('user_name_receiver', 'test_user_receiver@test.com');

    await saveNotification(
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
    const resultUser = await findNotificationByReceiverId(receiverUser.id);
    expect(resultUser.receiverId).toBe(receiverUser.id);
    expect(resultUser.reason).toBe(data.reason);
    expect(resultUser.creatorId).toBe(creatorUser.id);
    expect(resultUser.title).toBe(data.title);
    console.log('resultUser:', resultUser.read);
  });

  test('if read all notifications return success', async () => {
    const receiverUser = await createUser('user_name_receiver', 'test_user_receiver@test.com');
    const creatorUser = await createUser(`user_name_creator$`, 'test_user_creator@test.com');
    const promises = [];
    const numberOfTests = 6;
    for (let i = 0; i < numberOfTests; i += 1) {
      promises.push(
        saveNotification(
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
    const setReadAllResult = await setReadAllNotifications(null, null, { user: { id: receiverUser.id } });
    const findNotificationResult = await findNotificationByReceiverId(receiverUser.id);
    expect(setReadAllResult.statusCode).toBe(STATUS_CODE.SUCCESS);
    for (let j = 0; j < numberOfTests; j += 1) {
      expect(findNotificationResult[j].read).toBe(true);
    }
  });
});

import { saveNotification, NOTIFICATION_REASON } from './notifications';
import databaseUtils from '../db/database';
import { TABLES } from '../constants';

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
  test('if correct input for mutation/notification/saveNotification should give success', async () => {
    const creatorUser = await createUser('user_name_creator', 'test_user_creator@test.com');
    const receiverUser = await createUser('user_name_receiver', 'test_user_receiver@test.com');

    const data = {
      reason: NOTIFICATION_REASON.ANSWER_CLAPPED,
      creatorId: creatorUser.id,
      receiverId: receiverUser.id,
      title: 'title',
      content: 'content',
      metaData: 'metaData',
      type: 'ok',
      read: false,
    };

    console.log('Data ', data);
    await saveNotification(
      data.reason,
      data.creatorId,
      data.receiverId,
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
    const resultUser = await findNotificationByReceiverId(data.receiverId);
    expect(resultUser.receiverId).toBe(data.receiverId);
    expect(resultUser.reason).toBe(data.reason);
    expect(resultUser.creatorId).toBe(data.creatorId);
    expect(resultUser.title).toBe(data.title);
  });
});

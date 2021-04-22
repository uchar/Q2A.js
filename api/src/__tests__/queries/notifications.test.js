import { TABLES } from '../../constants.js';
import { saveNotification } from '../../mutations/notifications';
import { getNotifications } from '../../queries/notifications';
import { clearTable, makeContext, notificationData } from '../../testUtility';

describe('notification query api', () => {
  const checkNotificationCounts = async (countToBe) => {
    const notifs = await getNotifications(
      null,
      { language: notificationData.language, limit: 10, offset: 0 },
      makeContext()
    );
    expect(notifs.length).toBe(countToBe);
  };

  test('if getNotifications work', async () => {
    const user = global.test_user;
    await clearTable(TABLES.NOTIFICATION_TABLE);
    await checkNotificationCounts(0);

    const testCount = 3;
    const promises = [];
    for (let i = 0; i < testCount; i += 1)
      promises.push(
        saveNotification(
          notificationData.language,
          notificationData.reason,
          user.id,
          user.id,
          notificationData.title,
          notificationData.content
        )
      );
    await Promise.all(promises);
    await checkNotificationCounts(testCount);
  });
});

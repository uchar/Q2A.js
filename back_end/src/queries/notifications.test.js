import { TABLES } from '../constants.js';
import { saveNotification } from '../mutations/notifications';
import { getNotifications } from './notifications';
import { clearTable, makeContext } from '../testUtility';

describe('notification query api', () => {
  const data = {
    language: 'en',
    title: 'test_notification',
    content: 'Content of notification',
    reason: 'QUESTION_CLAPPED',
  };

  test('if getNotifications work', async () => {
    const user = global.test_user;
    await clearTable(TABLES.NOTIFICATION_TABLE);

    const testToAdd = 3;
    const promises = [];
    for (let i = 0; i < testToAdd; i += 1)
      promises.push(saveNotification(data.language, data.reason, user.id, user.id, data.title, data.content));

    await Promise.all(promises);
    const notifs = await getNotifications(
      null,
      { language: data.language, limit: 10, offset: 0 },
      makeContext()
    );
    expect(notifs.length).toBe(testToAdd);
  });
});

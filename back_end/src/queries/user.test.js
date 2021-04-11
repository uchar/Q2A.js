import { getUser } from './user';
import { makeContext } from '../testUtility';

describe('user query api', () => {
  test('if getUser with an id work', async () => {
    const user = global.test_user;
    const result = await getUser(null, { id: user.publicName }, null);
    expect(user.id).toBe(result.id);
    expect(user.publicName).toBe(result.publicName);
  });
  test('if getUser with context work (self)', async () => {
    const user = global.test_user;
    const result = await getUser(null, {}, makeContext());
    expect(user.id).toBe(result.id);
    expect(user.publicName).toBe(result.publicName);
  });
});

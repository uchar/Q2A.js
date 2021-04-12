import { getUser } from '../../queries/user';
import { makeContext } from '../../testUtility';

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
  test('if getUser with wrong id not work', async () => {
    const result = await getUser(null, { id: 'wrong_user' }, null);
    expect(result).toBe(null);
  });
  test('if getUser with wrong context not work', async () => {
    const result = await getUser(null, {}, { user: { id: 'wrong_id', publicName: 'wrong_public_name' } });
    expect(result).toBe(null);
  });
});

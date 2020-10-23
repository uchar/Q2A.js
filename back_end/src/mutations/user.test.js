import databaseUtils from '../db/database.js';
import { TABLES } from '../db/constants.js';
import { updateUser } from './user.js';

describe('how user graphql api work', () => {
  test(`if updateUser update user correctly`, async () => {
    const user = global.test_user;
    // TODO Test should not change global variable
    // TODO check for wrong input
    const data = {
      profileImage: 'profile_image_updated',
      about: 'about_test_updated',
      language: 'en',
      theme: 'test_theme_updated',
    };
    console.log('USER IS : ', user);

    await updateUser(
      null,
      {
        input: data,
      },
      { user: { id: user.id } }
    );

    const User = await databaseUtils().loadModel(TABLES.USER_TABLE);
    const updatedUser = (
      await User.findOne({
        where: {
          id: user.id,
        },
      })
    ).dataValues;
    expect(updatedUser.profileImage).toBe(data.profileImage);
    expect(updatedUser.about).toBe(data.about);
    expect(updatedUser.language).toBe(data.language);
    expect(updatedUser.theme).toBe(data.theme);
  });
});

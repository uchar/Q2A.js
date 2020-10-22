const database = require('../db/database').getDatabase;
const tables = require('../db/constants').TABLES;
const { updateUser } = require('./user');

describe('how user graphql api work', () => {
  test(`if updateUser update user correctly`, async () => {
    // TODO check for wrong input

    // Create new user
    const User = await database().loadModel(tables.USER_TABLE);
    const user = await User.create({
      publicName: 'test_name',
      email: 'test@test.com',
      isLegacyAuthentication: false,
      isEmailVerified: true,
      language: 'fa',
    });

    const data = {
      publicName: 'public_name',
      profileImage: 'profile_image_updated',
      about: 'about_test_updated',
      language: 'en',
      theme: 'test_theme_updated',
    };

    await updateUser(
      null,
      {
        input: data,
      },
      { user: { id: user.id } }
    );

    const updatedUser = await User.findOne({
      where: {
        id: user.id,
      },
    });
    expect(updatedUser.publicName).toBe(data.publicName);
    expect(updatedUser.profileImage).toBe(data.profileImage);
    expect(updatedUser.about).toBe(data.about);
    expect(updatedUser.language).toBe(data.language);
    expect(updatedUser.theme).toBe(data.theme);
  });
});

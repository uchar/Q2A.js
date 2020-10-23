import createDatabasePromise from './src/db/createDatabase.js';
import databaseUtils from './src/db/database.js';
import { TABLES } from './src/db/constants.js';

global.beforeEach(async () => {
  await createDatabasePromise;

  const User = await databaseUtils().loadModel(TABLES.USER_TABLE);
  const user = await User.create({
    publicName: 'test_name',
    email: 'test@test.com',
    isLegacyAuthentication: false,
    isEmailVerified: true,
    language: 'fa',
  });
  global.test_user = user.dataValues;
});

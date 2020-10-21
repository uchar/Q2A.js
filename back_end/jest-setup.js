const { createDatabasePromise } = require('./src/db/createDatabase');
const database = require('./src/db/database').getDatabase;
const tables = require('./src/db/constants').TABLES;

global.beforeEach(async () => {
  await createDatabasePromise;

  const User = await database().loadModel(tables.USER_TABLE);
  const user = await User.create({
    publicName: 'test_name',
    email: 'test@test.com',
    isLegacyAuthentication: false,
    isEmailVerified: true,
    language: 'fa',
  });
  global.test_user = user.dataValues;
});

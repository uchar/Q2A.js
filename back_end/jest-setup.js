import jwt from 'jsonwebtoken';
import createDatabasePromise from './src/db/createDatabase.js';
import databaseUtils from './src/db/database.js';
import { TABLES } from './src/constants.js';
import { signUp } from './src/mutations/login.js';

global.beforeAll(async () => {
  await createDatabasePromise;
  process.env.JWT_SECRET = 'SOME_RANDOM_JWT';
  const User = await databaseUtils().loadModel(TABLES.USER_TABLE);
  const Statistics = await databaseUtils().loadModel(TABLES.STATISTICS_TABLE);
  const Notification = await databaseUtils().loadModel(TABLES.NOTIFICATION_TABLE);
  await Statistics.create({
    language: 'en',
    tagsCount: 0,
    blogPostsCount: 0,
    allQuestionsCount: 0,
    usersCount: 0,
  });
  await Statistics.create({
    language: 'fa',
    tagsCount: 0,
    blogPostsCount: 0,
    allQuestionsCount: 0,
    usersCount: 0,
  });
  const user = await signUp(null, {
    email: 'test@test.com',
    username: 'test_name',
    password: '123654',
  });
  const findUserById = async (id) => {
    return User.findOne({
      where: {
        id,
      },
    });
  };
  const decodedUser = await jwt.decode(user);
  const result = await findUserById(decodedUser.id);
  global.test_user = result.dataValues;
  global.User = User;
  global.Notification = Notification;
});

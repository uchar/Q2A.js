import 'dotenv/config.js';
import jwt from 'jsonwebtoken';
import createDatabasePromise from './src/db/createDatabase.js';
import databaseUtils from './src/db/database.js';
import { TABLES } from './src/constants.js';
import { signUp } from './src/mutations/login.js';

global.beforeAll(async () => {
  await createDatabasePromise;
  const User = await databaseUtils().loadModel(TABLES.USER_TABLE);
  const Notification = await databaseUtils().loadModel(TABLES.NOTIFICATION_TABLE);
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

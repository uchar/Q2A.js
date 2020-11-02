import jwt from 'jsonwebtoken';
import { signUp } from './login.js';

describe('how user graphql api work', () => {
  const data = {
    username: 'test_name_login',
    email: 'test_login@test.com',
    password: '123654',
    language: 'en',
  };
  const userSignUp = async () => {
    console.log('???');
    const { User } = global;
    const user = await signUp(null, {
      email: data.email,
      username: data.username,
      password: data.password,
      language: data.language,
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
    console.log(result);
    return result;
  };
  test('Sign up with correct username and password works', async () => {
    const decodedUser = await userSignUp();
    console.log(decodedUser);
  });
});

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { signUp } from './login.js';
import { findUserById } from '../utility.js';

describe('how user graphql api work', () => {
  const data = {
    username: 'test_name_login',
    email: 'test_login@test.com',
    password: '123654',
    language: 'en',
  };
  const userSignUp = async () => {
    const user = await signUp(null, {
      email: data.email,
      username: data.username,
      password: data.password,
      language: data.language,
    });

    return user;
  };
  test('Sign up with correct username and password works', async () => {
    const user = await userSignUp();
    const decodedUser = await jwt.decode(user);
    const result = await findUserById(decodedUser.id);
    const isValidPassword = await bcrypt.compare(data.password, result.password);
    expect(decodedUser.publicName).toBe(data.username);
    expect(decodedUser.exp - decodedUser.iat).toBe(60 * 60 * 24 * 7); // 7 days
    expect(result.publicName).toBe(data.username);
    expect(result.email).toBe(data.email);
    expect(result.language).toBe(data.language);
    expect(isValidPassword).toBe(true);
  });
});

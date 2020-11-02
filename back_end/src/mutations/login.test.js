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
  const userSignUp = async (email, username, password, language) => {
    const user = await signUp(null, {
      email,
      username,
      password,
      language,
    });

    return user;
  };
  const testSignUpWrongInput = async (email, username, password, language) => {
    let user;
    try {
      user = await userSignUp(email, username, password, language);
    } catch (e) {
      expect(e.name).toBe('ValidationError');
    }
    if (user)
      expect(`Sign up should give error with:' ${email},${username},${password},${language}`).toBe(false);
  };
  test('Sign up with correct username and password works', async () => {
    const user = await userSignUp(data.email, data.username, data.password, data.language);
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

  test("if Sign up with the wrong username or password shouldn't work", async () => {
    await testSignUpWrongInput('wrong_email', data.username, 'correct_password', data.language);
    await testSignUpWrongInput(data.email, data.username, '12', data.language);
    await testSignUpWrongInput('wrong_email', 'ab', 'er', data.language);
    await testSignUpWrongInput(data.email, ')wrong_username', data.password, data.language);
    await testSignUpWrongInput(data.email, 'a__wrong_username', data.password, data.language);
    await testSignUpWrongInput(data.email, 'er', data.password, data.language);
    await testSignUpWrongInput(data.email, '_wrong_username', data.password, data.language);
  });
  test("if login with the wrong username or password shouldn't work", async () => {});
});

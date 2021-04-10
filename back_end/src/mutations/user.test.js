import { STATUS_CODE } from '../constants.js';
import { updateUser } from './user.js';
import { findUserById } from '../utility';

describe('user mutation api (updateUser,..)', () => {
  const data = {
    publicName: 'public_name_updated',
    profileImage: 'profile_image_updated.png',
    about: 'about_test_updated',
    theme: 'dark',
  };
  const callUpdateUser = async (userId, input) => {
    return updateUser(null, input, userId ? { user: { id: userId } } : null);
  };

  const createUser = async () => {
    const { User } = global;
    const oldUser = await User.create({
      publicName: 'test_name',
      profileImage: 'test_image.png',
      email: 'test@test.com',
      isEmailVerified: true,
      about: 'about_test',
      theme: 'light',
    });

    return { oldUser, data };
  };

  const testWrongInput = async (fieldNames, fieldValues) => {
    const updateData = {};
    fieldNames.forEach((fieldName, index) => {
      updateData[fieldName] = fieldValues[index];
    });
    const { oldUser } = await createUser();
    let updateResult;
    try {
      updateResult = await callUpdateUser(oldUser.id, updateData);
    } catch (e) {
      expect(e.name).toBe('ValidationError');
    }
    expect(updateResult).toBeFalsy();
    const updatedUser = await findUserById(oldUser.id);
    fieldNames.forEach((fieldName) => {
      expect(updatedUser[fieldName]).toBe(oldUser[fieldName]);
    });
  };
  const testCorrectInput = async (fieldNames, fieldValues) => {
    const updateData = {};
    fieldNames.forEach((fieldName, index) => {
      updateData[fieldName] = fieldValues[index];
    });
    const { oldUser } = await createUser();
    const updateResult = await callUpdateUser(oldUser.id, updateData);
    const updatedUser = await findUserById(oldUser.id);
    expect(updateResult.statusCode).toBe(STATUS_CODE.SUCCESS);
    fieldNames.forEach((fieldName, index) => {
      expect(updatedUser[fieldName]).toBe(fieldValues[index]);
    });
  };

  test('if correct input for mutation/updateUser give success', async () => {
    await testCorrectInput(
      ['publicName', 'profileImage', 'about', 'theme'],
      [data.publicName, data.profileImage, data.about, data.theme]
    );
    await testCorrectInput(['publicName', 'about', 'theme'], [data.publicName, data.about, data.theme]);
  });

  test('if wrong input for mutation/updateUser should give error', async () => {
    await testWrongInput(['about', 'theme'], ['updated_about', 'wrong_theme']);
    await testWrongInput(['profileImage'], ['test_updated_image.jpgg']);
    await testWrongInput(['profileImage'], ['test_updated_image']);
    await testWrongInput(['profileImage'], [{ shouldNotBeJson: 'wrong_value' }]);
    await testWrongInput(['theme'], ['yellow']);
  });

  test(`if updateUser not work with wrong id`, async () => {
    await expect(callUpdateUser(null, data)).rejects.toThrow(STATUS_CODE.AUTHORIZATION_ERROR);
    await expect(callUpdateUser('wrong_id', data)).rejects.toThrow(STATUS_CODE.VALIDATION_ERROR);
  });
});

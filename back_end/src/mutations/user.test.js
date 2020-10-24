import { STATUS_CODE } from '../constants.js';
import { updateUser } from './user.js';
import { findUserById } from '../utility';

describe('how user graphql api work', () => {
  const changeID = false;

  const callUpdateUser = async (userID, data) => {
    return updateUser(
      null,
      {
        input: data,
      },
      userID ? { user: { id: userID } } : null
    );
  };

  const createUserAndUpdate = async (fieldNames, fieldValues) => {
    const { User } = global;
    const oldUser = await User.create({
      publicName: 'test_name',
      profileImage: 'test_image.png',
      email: 'test@test.com',
      isLegacyAuthentication: false,
      isEmailVerified: true,
      about: 'about_test',
      language: 'en',
      theme: 'light',
    });
    console.log('fieldNames:', fieldNames);
    console.log('fieldValues:', fieldValues);
    const data = {};
    fieldNames.forEach((fieldName, index) => {
      data[fieldName] = fieldValues[index];
    });
    console.log('data:', data);

    const updateResult = await callUpdateUser(oldUser.id, data);

    return { updateResult, oldUser };
  };

  const testWrongInput = async (fieldNames, fieldValues) => {
    const { updateResult, oldUser } = await createUserAndUpdate(fieldNames, fieldValues, changeID);
    const updatedUser = await findUserById(oldUser.id);
    console.log(updateResult);
    expect(updateResult.statusCode).toBe(STATUS_CODE.INPUT_ERROR);
    fieldNames.forEach((fieldName) => {
      expect(updatedUser[fieldName]).toBe(oldUser[fieldName]);
    });
  };
  const testCorrectInput = async (fieldNames, fieldValues) => {
    const { updateResult, oldUser } = await createUserAndUpdate(fieldNames, fieldValues, changeID);
    const updatedUser = await findUserById(oldUser.id);
    console.log(updateResult);
    expect(updateResult.statusCode).toBe(STATUS_CODE.SUCCESS);
    fieldNames.forEach((fieldName, index) => {
      expect(updatedUser[fieldName]).toBe(fieldValues[index]);
    });
  };

  test('if wrong input for mutation/updateUser should give error', async () => {
    await testWrongInput(['language'], ['ru']);
    await testWrongInput(['language', 'about'], ['ru', 'updated_about']);
    await testWrongInput(['about', 'language'], ['updated_about', 'ru']);
    await testWrongInput(['profileImage'], ['test_updated_image.jpgg']);
    await testWrongInput(['profileImage'], ['test_updated_image']);
    await testWrongInput(['profileImage'], [{ shouldNotBeJson: 'wrong_value' }]);
    await testWrongInput(['theme'], ['yellow']);
  });

  test('if correct input for mutation/updateUser should give success', async () => {
    const data = {
      publicName: 'public_name_updated',
      profileImage: 'profile_image_updated.png',
      about: 'about_test_updated',
      language: 'en',
      theme: 'dark',
    };
    await testCorrectInput(
      ['publicName', 'profileImage', 'about', 'language', 'theme'],
      [data.publicName, data.profileImage, data.about, data.language, data.theme]
    );
    await testCorrectInput(
      ['publicName', 'about', 'language', 'theme'],
      [data.publicName, data.about, data.language, data.theme]
    );
  });

  test(`if updateUser not work with wrong id`, async () => {
    // const data = {
    //   publicName: 'public_name_updated',
    //   profileImage: 'profile_image_updated.png',
    //   about: 'about_test_updated',
    //   language: 'en',
    //   theme: 'dark',
    // };
    // const updateResult = await callUpdateUser('wrong_id', data);
    // const updateResult2 = await callUpdateUser(null, data);
    // expect(updateResult2.statusCode).toBe(STATUS_CODE.AUTHORIZATION_ERROR);
    // expect(updateResult.statusCode).toBe(STATUS_CODE.VALIDATION_ERROR);
    // fieldNames.forEach((fieldName, index) => {
    //   expect(updatedUser[fieldName]).toBe(fieldValues[index]);
    // });
  });
});

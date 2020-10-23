// import databaseUtils from '../db/database.js';
// import { TABLES } from '../db/constants.js';
// import { updateUser } from './user.js';

describe('how user graphql api work', () => {
  test('random tesxt', () => {});
  // test(`if updateUser update user correctly`, async () => {
  //   // Create new user
  //   const User = await database().loadModel(tables.USER_TABLE);
  //   const user = await User.create({
  //     publicName: 'test_name',
  //     email: 'test@test.com',
  //     isLegacyAuthentication: false,
  //     isEmailVerified: true,
  //     language: 'fa',
  //   });
  //
  //   const data = {
  //     publicName: 'public_name',
  //     profileImage: 'profile_image_updated',
  //     about: 'about_test_updated',
  //     language: 'en',
  //     theme: 'test_theme_updated',
  //   };
  //
  //   await updateUser(
  //     null,
  //     {
  //       input: data,
  //     },
  //     { user: { id: user.id } }
  //   );
  //
  //   const updatedUser = await User.findOne({
  //     where: {
  //       id: user.id,
  //     },
  //   });
  //   expect(updatedUser.publicName).toBe(data.publicName);
  //   expect(updatedUser.profileImage).toBe(data.profileImage);
  //   expect(updatedUser.about).toBe(data.about);
  //   expect(updatedUser.language).toBe(data.language);
  //   expect(updatedUser.theme).toBe(data.theme);
  // });
  // // test null data
  // test(`updateUser check for wrong input`, async () => {
  //   const User = await database().loadModel(tables.USER_TABLE);
  //   const user = await updateUser(
  //     null,
  //     {
  //       input: null,
  //     },
  //     { user: { id: null } }
  //   );
  //   console.log("???????????",user)
  //   expect(user).();
  // });
  // test wrong id
  // test(`if updateUser update user correctly check user id in updateUser`, async () => {
  //   // Create new user
  //   const User = await database().loadModel(tables.USER_TABLE);
  //   const user = await User.create({
  //     publicName: 'test_name',
  //     email: 'test@test.com',
  //     isLegacyAuthentication: false,
  //     isEmailVerified: true,
  //     language: 'fa',
  //   });
  //
  //   const data = {
  //     publicName: 'public_name',
  //     profileImage: 'profile_image_updated',
  //     about: 'about_test_updated',
  //     language: 'en',
  //     theme: 'test_theme_updated',
  //   };
  //
  //   await updateUser(
  //     null,
  //     {
  //       input: data,
  //     },
  //     { user: { id: 5 } }
  //   );
  //
  //   const updatedUser = await User.findOne({
  //     where: {
  //       id: user.id,
  //     },
  //   });
  //   expect(updatedUser.publicName).toBe(data.publicName);
  //   expect(updatedUser.profileImage).toBe(data.profileImage);
  //   expect(updatedUser.about).toBe(data.about);
  //   expect(updatedUser.language).toBe(data.language);
  //   expect(updatedUser.theme).toBe(data.theme);
  // });
  //
  // test(`if updateUser update user correctly check user id in findOne`, async () => {
  //   // Create new user
  //   const User = await database().loadModel(tables.USER_TABLE);
  //   const user = await User.create({
  //     publicName: 'test_name',
  //     email: 'test@test.com',
  //     isLegacyAuthentication: false,
  //     isEmailVerified: true,
  //     language: 'fa',
  //   });
  //
  //   const data = {
  //     publicName: 'public_name',
  //     profileImage: 'profile_image_updated',
  //     about: 'about_test_updated',
  //     language: 'en',
  //     theme: 'test_theme_updated',
  //   };
  //
  //   await updateUser(
  //     null,
  //     {
  //       input: data,
  //     },
  //     { user: { id: user.id } }
  //   );
  //
  //   const updatedUser = await User.findOne({
  //     where: {
  //       id: 'wrong ID',
  //     },
  //   });
  //   expect(updatedUser.publicName).toBe(data.publicName);
  // });
  // test(`wrong language in updateUser`, async () => {
  //   // Create new user
  //   const User = await database().loadModel(tables.USER_TABLE);
  //   const user = await User.create({
  //     publicName: 'test_name',
  //     email: 'test@test.com',
  //     isLegacyAuthentication: false,
  //     isEmailVerified: true,
  //     language: 'en',
  //   });
  //
  //   const data = {
  //     publicName: 'public_name',
  //     profileImage: 'profile_image_updated',
  //     about: 'about_test_updated',
  //     language: 'ru',
  //     theme: 'test_theme_updated',
  //   };
  //
  //   await updateUser(
  //     null,
  //     {
  //       input: data,
  //     },
  //     { user: { id: user.id } }
  //   );
  //
  //   const updatedUser = await User.findOne({
  //     where: {
  //       id: user.id,
  //     },
  //   });
  //   console.log('updatedUser:', updatedUser);
  //   expect(updatedUser.language).toBe(data.language);
  // });
});

import bcrypt from 'bcrypt';
import { ROLE, LANGUAGE } from '../constants.js';

const getUsersData = async () => {
  return [
    {
      publicName: process.env.SUPER_ADMIN_USERNAME,
      profileImage: 'q2a_admin.png',
      about: 'Some descriptions about q2a_admin',
      theme: 'light',
      role: ROLE.SUPER_ADMIN,
      score: 0,
      language: LANGUAGE.ENGLISH,
      email: process.env.SUPER_ADMIN_EMAIL,
      password: await bcrypt.hash(process.env.SUPER_ADMIN_PASSWORD, 10),
      isEmailVerified: true,
    },
    {
      publicName: 'demo1',
      profileImage: 'q2a_demo1.png',
      about: 'Some descriptions about demo1 user',
      theme: 'light',
      role: ROLE.USER_CONFIRMED,
      score: 0,
      language: LANGUAGE.ENGLISH,
      email: 'demo1@gmail.com',
      password: await bcrypt.hash('demo1_password', 10),
      isEmailVerified: true,
    },
    {
      publicName: 'demo2',
      profileImage: 'q2a_demo2.png',
      about: 'Some descriptions about demo2 user',
      theme: 'dark',
      role: ROLE.USER_CONFIRMED,
      score: 0,
      language: LANGUAGE.ENGLISH,
      email: 'demo2@gmail.com',
      password: await bcrypt.hash('demo2_password', 10),
      isEmailVerified: true,
    },
    {
      publicName: 'demo3',
      profileImage: 'q2a_demo3.png',
      about: 'Some descriptions about demo2 user',
      theme: 'dark',
      role: ROLE.USER_CONFIRMED,
      score: 0,
      language: LANGUAGE.ENGLISH,
      email: 'demo3@gmail.com',
      password: await bcrypt.hash('demo3_password', 10),
      isEmailVerified: true,
    },
  ];
};

export { getUsersData };

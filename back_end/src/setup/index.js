import 'dotenv/config.js';
import bcrypt from 'bcrypt';
import createDatabasePromise from '../db/createDatabase.js';
import databaseUtils from '../db/database.js';
import { TABLES } from '../constants.js';

createDatabasePromise.then(async () => {
  const User = await databaseUtils().loadModel(TABLES.USER_TABLE);
  const Tag = await databaseUtils().loadModel(TABLES.TAG_TABLE);
  const Post = await databaseUtils().loadModel(TABLES.POST_TABLE);
  await User.create({
    publicName: process.env.SUPER_ADMIN_USERNAME,
    profileImage: 'q2a_admin.png',
    about: 'Some descriptions about q2a_admin',
    theme: 'light',
    accessLevel: 'SUPER_ADMIN',
    score: 0,
    email: process.env.SUPER_ADMIN_EMAIL,
    password: await bcrypt.hash(process.env.SUPER_ADMIN_PASSWORD, 10),
    isEmailVerified: true,
  });
  await Tag.create({
    title: 'javascript',
    content:
      'JavaScript (/ˈdʒɑːvəˌskrɪpt/),[8] often abbreviated as JS, is a programming language that conforms to the ECMAScript specification.[9] JavaScript is high-level, often just-in-time compiled, and multi-paradigm. It has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions.',
    used: 1,
    language: 'en',
  });
  await Tag.create({
    title: 'next.js',
    content:
      'Next.js is an open-source React front-end development web framework that enables functionality such as server-side rendering and generating static websites for React based web applications. It is a production-ready framework that allows developers to quickly create static and dynamic JAMstack websites and is used widely by many large companies.',
    used: 1,
    language: 'en',
  });
  await Tag.create({
    title: 'javascript',
    content: 'زبان برنامه نویسی جاوااسکریپت',
    used: 1,
    language: 'fa',
  });
  await Tag.create({
    title: 'next.js',
    content: '....',
    used: 1,
    language: 'fa',
  });
  await Post.create({
    type: 'QUESTION',
    language: 'en',
    title: 'What is Next.js in the context of React? ',
    content:
      "<p>I am new to React and came across Next.js. Being new to React, beyond a general understanding that it's a software tool used many React programmers and projects I couldn't figure out and what specific problems of React development it helps address</p>",
    viewsCount: 0,
    votesCount: 0,
    answersCount: 0,
    userId: 1,
    tag1: 'javascript',
    tag2: 'next.js',
  });
  await Post.create({
    type: 'QUESTION',
    language: 'fa',
    title: 'طولانی بودن زمان بیلد و کامپایل کد ',
    content:
      '<p>من با vs۲۰۱۹ و c++ کار می کنم یکی از مشکلات عمده ای که وجود داره طولانی بودن زمان بیلد و کامپایل کد هستش چندین روش در خود سایت مایکروسافت پیشنهاد شده بود که اعمالشون کردم شما از چه روش هایی برای کاهش زمان بیلد و کامپایل استفاده می کنید؟</p>',
    viewsCount: 0,
    votesCount: 0,
    answersCount: 0,
    userId: 1,
    tag1: 'javascript',
    tag2: 'next.js',
  });
  console.log('Setup finished successfully');
});

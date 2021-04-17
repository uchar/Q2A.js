import 'dotenv/config.js';
import createDatabasePromise from '../db/createDatabase.js';
import databaseUtils from '../db/database.js';
import { TABLES } from '../constants.js';
import { getBlogPostsData, getQuestionsData, getTagsData, getUsersData } from './data.js';

createDatabasePromise.then(async () => {
  const addDataToDb = (promises, datas, tableName) => {
    const newPromises = datas.map(async (data) => {
      const Model = await databaseUtils().loadModel(tableName);
      Model.create(data);
    });
    return newPromises.concat(promises);
  };
  const usersData = await getUsersData();
  const tagsData = await getTagsData();
  const questionsData = await getQuestionsData();
  const blogPostsData = await getBlogPostsData();
  let promises = [];
  promises = addDataToDb(promises, usersData, TABLES.USER_TABLE);
  promises = addDataToDb(promises, tagsData, TABLES.TAG_TABLE);
  await Promise.all(promises);
  promises = [];
  promises = addDataToDb(promises, questionsData, TABLES.POST_TABLE);
  promises = addDataToDb(promises, blogPostsData, TABLES.BLOG_POST_TABLE);
  await Promise.all(promises);
  console.log('Setup finished successfully');
});

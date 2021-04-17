import 'dotenv/config.js';
import Importer from 'mysql-import';
import createDatabasePromise from '../db/createDatabase.js';
import databaseUtils from '../db/database.js';
import { TABLES } from '../constants.js';
import { getUsersData } from './data.js';

createDatabasePromise.then(async () => {
  const importDb = async () => {
    const importer = new Importer({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
    });

    // New onProgress method, added in version 5.0!
    importer.onProgress((progress) => {
      const percent = Math.floor((progress.bytes_processed / progress.total_bytes) * 10000) / 100;
      console.log(`${percent}% Completed`);
    });

    await importer.import('./src/setup/data.sql');
    console.log('Import finished');
  };
  const addDataToDb = (promises, datas, tableName) => {
    const newPromises = datas.map(async (data) => {
      const Model = await databaseUtils().loadModel(tableName);
      Model.create(data);
    });
    return newPromises.concat(promises);
  };
  const usersData = await getUsersData();
  let promises = [];
  promises = addDataToDb(promises, usersData, TABLES.USER_TABLE);
  await Promise.all(promises);
  await importDb();
  console.log('Setup finished successfully');
});

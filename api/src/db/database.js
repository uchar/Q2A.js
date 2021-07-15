import Sequelize from 'sequelize';
import config from './config.js';

let db = null;
const models = new Map();
const isInTestMode = process.env.JEST_WORKER_ID;

const databaseUtils = () => {
  const makeDb = async () => {
    const sequelize = isInTestMode
      ? new Sequelize('sqlite::memory:', { logging: false })
      : new Sequelize(config.database, config.user, config.password, {
          host: config.host,
          port: config.port,
          dialect: 'mysql',
          pool: {
            max: 5,
            min: 0,
            idle: 10000,
          },
        });

    try {
      await sequelize.authenticate();
      // console.log('Connection established successfully.');
    } catch (err) {
      console.error('Unable to connect to the database:', err);
      sequelize.close();
    }
    return sequelize;
  };

  return {
    getSequelize: async () => {
      if (!db) {
        db = await makeDb();
      }
      return db;
    },
    cacheModel: (key, model) => {
      models.set(key, model);
    },
    loadModel: (key) => {
      return models.get(key);
    },
  };
};

export default databaseUtils;

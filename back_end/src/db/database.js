const Sequelize = require('sequelize');
const config = require('./config');

let db = null;
const models = new Map();

module.exports.getDatabase = () => {
  const makeDb = async () => {
    const sequelize = new Sequelize(config.database, config.user, config.password, {
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
      console.log('Connection established successfully.');
    } catch (err) {
      console.error('Unable to connect to the database:', err);
      sequelize.close();
    }
    return sequelize;
  };

  return {
    getSequelize: async () => {
      if (!db) {
        console.log('MAKE DB : ', config);
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

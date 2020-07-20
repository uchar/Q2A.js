const Sequelize = require('sequelize');

const config = {
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.PORT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  supportBigNumbers: true,
  bigNumberStrings: true,
};

let db = null;
const models = new Map();

module.exports.getTables = () => {
  return {
    USER_TABLE: 'user',
    POST_TABLE: 'post',
    TAG_TABLE: 'tag',
    CLAP_TABLE: 'clap',
    POST_TAG_TABLE: 'posttag',
  };
};
module.exports.getPostTypes = () => {
  return {
    ANSWER: 'ANSWER',
    QUESTION: 'QUESTION',
    COMMENT: 'TAG',
  };
};
module.exports.getUtils = () => {
  const makeDb = async () => {
    console.log('Config : ', config);
    const sequelize = new Sequelize(config.database, config.user, config.password, {
      host: config.host,
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
      },
    });

    try {
      await sequelize.authenticate().then(() => {
        console.log('Connection established successfully.');
      });
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

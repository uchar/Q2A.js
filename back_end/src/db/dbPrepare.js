const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');
const database = require('./database').getDatabase();
const tables = require('./constants').TABLES;

const prepareDatabase = async () => {
  const sequelize = await database.getSequelize();

  const User = sequelize.define(tables.USER_TABLE, {
    publicName: Sequelize.STRING,
    profileImage: Sequelize.STRING,
    about: Sequelize.TEXT,
    email: Sequelize.STRING(64),
    password: Sequelize.STRING(64),
    legacyPasswordSalt: { type: 'BINARY(16)' },
    legacyPassword: { type: 'BINARY(20)' },
    lastLogin: Sequelize.DATE,
    lastWrite: Sequelize.DATE,
    isLegacyAuthentication: Sequelize.BOOLEAN,
  });
  const Post = sequelize.define(tables.POST_TABLE, {
    type: DataTypes.ENUM([
      'QUESTION',
      'ANSWER',
      'COMMENT',
      'QUESTION_HIDDEN',
      'ANSWER_HIDDEN',
      'COMMENT_HIDDEN',
    ]),
    title: Sequelize.STRING(512),
    content: Sequelize.TEXT,
    viewsCount: Sequelize.INTEGER,
    votesCount: Sequelize.INTEGER,
    answersCount: Sequelize.INTEGER,
    tag1: Sequelize.STRING(64),
    tag2: Sequelize.STRING(64),
    tag3: Sequelize.STRING(64),
    tag4: Sequelize.STRING(64),
    tag5: Sequelize.STRING(64),
    parentId: {
      type: Sequelize.UUID,
      primaryKey: false,
    },
  });
  const Tag = sequelize.define(tables.TAG_TABLE, {
    title: Sequelize.STRING,
    content: Sequelize.TEXT,
    used: Sequelize.INTEGER,
  });
  const Clap = sequelize.define(tables.CLAP_TABLE, {
    count: Sequelize.INTEGER,
  });
  Post.belongsTo(User);
  User.hasMany(Clap);
  Clap.belongsTo(Post);
  Clap.belongsTo(Post);
  Post.hasMany(Clap);
  await sequelize.sync({ force: false });
  database.cacheModel(tables.USER_TABLE, User);
  database.cacheModel(tables.POST_TABLE, Post);
  database.cacheModel(tables.TAG_TABLE, Tag);
  database.cacheModel(tables.CLAP_TABLE, Clap);
};
exports.preparePromise = prepareDatabase().then(() => {
  console.log('PREPARE FINISHED');
  return { result: 'SUCCESS' };
});

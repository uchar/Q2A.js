import Sequelize from 'sequelize';
import databaseUtils from './database.js';
import { TABLES as tables } from '../constants.js';

const { DataTypes } = Sequelize;

const prepareDatabase = async () => {
  const sequelize = await databaseUtils().getSequelize();

  const User = sequelize.define(tables.USER_TABLE, {
    publicName: Sequelize.STRING,
    profileImage: Sequelize.STRING,
    about: Sequelize.TEXT,
    language: {
      type: Sequelize.STRING(6),
      allowNull: false,
    },
    theme: {
      type: Sequelize.STRING(6),
      allowNull: false,
      defaultValue: 'light',
    },
    accessLevel: {
      type: DataTypes.ENUM(['GUEST', 'USER_CONFIRMED', 'USER_NOT_CONFIRMED', 'ADMIN', 'SUPER_ADMIN']),
      allowNull: false,
      defaultValue: 'USER_CONFIRMED',
    },
    score: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: { min: 0 },
    },
    email: Sequelize.STRING(64),
    password: Sequelize.STRING(64),
    lastLogin: Sequelize.DATE,
    lastWrite: Sequelize.DATE,
    isEmailVerified: Sequelize.BOOLEAN,
  });
  const Post = sequelize.define(tables.POST_TABLE, {
    type: {
      type: DataTypes.ENUM([
        'QUESTION',
        'ANSWER',
        'COMMENT',
        'QUESTION_HIDDEN',
        'ANSWER_HIDDEN',
        'COMMENT_HIDDEN',
      ]),
      allowNull: false,
    },
    language: {
      type: Sequelize.STRING(2),
      allowNull: false,
    },
    title: Sequelize.STRING(256),
    content: Sequelize.TEXT,
    viewsCount: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: { min: 0 },
    },
    votesCount: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: { min: 0 },
    },
    answersCount: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: { min: 0 },
    },
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
    title: Sequelize.STRING(64),
    content: Sequelize.TEXT,
    used: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: { min: 0 },
    },
  });
  const Clap = sequelize.define(tables.CLAP_TABLE, {
    count: Sequelize.INTEGER,
  });
  const Notification = sequelize.define(tables.NOTIFICATION_TABLE, {
    reason: DataTypes.ENUM([
      'QUESTION_CLAPPED',
      'ANSWER_CLAPPED',
      'COMMENT_CLAPPED',
      'ANSWER_RECEIVED',
      'COMMENT_RECEIVED',
      'QUESTION_HIDED',
      'ANSWER_HIDED',
      'COMMENT_HIDED',
    ]),
    title: Sequelize.TEXT,
    content: Sequelize.TEXT,
    metaData: Sequelize.TEXT,
    read: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
  const Medal = sequelize.define(tables.Medal_TABLE, {
    type: DataTypes.ENUM(['GOLD', 'SILVER', 'BRONZE']),
    name: Sequelize.STRING(64),
  });
  Post.belongsTo(User);
  User.hasMany(Clap);
  Clap.belongsTo(Post);
  Clap.belongsTo(User);
  Post.hasMany(Clap);
  Notification.belongsTo(User, { as: 'creator' });
  Notification.belongsTo(User, { as: 'receiver' });
  User.hasMany(Notification, { foreignKey: 'creatorId' });
  Medal.belongsTo(User);
  User.hasMany(Medal);
  await sequelize.sync({ force: false });
  databaseUtils().cacheModel(tables.USER_TABLE, User);
  databaseUtils().cacheModel(tables.POST_TABLE, Post);
  databaseUtils().cacheModel(tables.TAG_TABLE, Tag);
  databaseUtils().cacheModel(tables.CLAP_TABLE, Clap);
  databaseUtils().cacheModel(tables.NOTIFICATION_TABLE, Notification);
  databaseUtils().cacheModel(tables.Medal_TABLE, Medal);
};

const createDatabasePromise = prepareDatabase().then(() => {
  console.log('PREPARE FINISHED');
  return { result: 'SUCCESS' };
});

export default createDatabasePromise;

import databaseUtils from './database.js';
import { TABLES as tables } from '../constants.js';
import UserModel from '../models/User.js';
import PostModel from '../models/Post.js';
import BlogPostModel from '../models/BlogPost.js';
import TagModel from '../models/Tag.js';
import ClapModel from '../models/Clap.js';
import NotificationModel from '../models/Notification.js';
import MedalModel from '../models/Medal.js';

const prepareDatabase = async () => {
  const sequelize = await databaseUtils().getSequelize();

  const User = sequelize.define(tables.USER_TABLE, UserModel);
  const Post = sequelize.define(tables.POST_TABLE, PostModel);
  const BlogPost = sequelize.define(tables.BLOG_POST_TABLE, BlogPostModel);
  const Tag = sequelize.define(tables.TAG_TABLE, TagModel);
  const Clap = sequelize.define(tables.CLAP_TABLE, ClapModel);
  const Notification = sequelize.define(tables.NOTIFICATION_TABLE, NotificationModel);
  const Medal = sequelize.define(tables.Medal_TABLE, MedalModel);

  BlogPost.belongsTo(User);
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
  databaseUtils().cacheModel(tables.BLOG_POST_TABLE, BlogPost);
};

const createDatabasePromise = prepareDatabase().then(() => {
  console.log('PREPARE FINISHED');
  return { result: 'SUCCESS' };
});

export default createDatabasePromise;

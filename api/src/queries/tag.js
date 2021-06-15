import databaseUtils from '../db/database.js';
import { TABLES } from '../constants.js';
import { findTag } from '../utility.js';

const getAllTags = async (_, { language, limit, offset }) => {
  const Tag = databaseUtils().loadModel(TABLES.TAG_TABLE);
  const tags = await Tag.findAll({
    where: { language },
    order: [['used', 'DESC']],
    limit,
    offset,
  });
  return tags;
};

const getTagDetail = async (_, { language, title }) => {
  return findTag(language, title);
};

export { getAllTags, getTagDetail };

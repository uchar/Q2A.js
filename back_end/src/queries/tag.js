import databaseUtils from '../db/database.js';
import { TABLES } from '../db/constants.js';

const getAllTags = async (_, { offset, limit }) => {
  const Tag = databaseUtils().loadModel(TABLES.TAG_TABLE);
  const tags = await Tag.findAll({
    order: [['used', 'DESC']],
    limit,
    offset,
  });
  return tags;
};

const getTagDetail = async (parent, { tag }) => {
  const Tag = await databaseUtils().loadModel(TABLES.TAG_TABLE);
  return Tag.findOne({
    where: {
      title: tag,
    },
  });
};

export { getAllTags, getTagDetail };

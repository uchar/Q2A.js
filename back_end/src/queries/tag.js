import databaseUtils from '../db/database.js';
import { TABLES } from '../constants.js';

const getAllTags = async (_, { language, offset, limit }) => {
  const Tag = databaseUtils().loadModel(TABLES.TAG_TABLE);
  const tags = await Tag.findAll({
    where: { language },
    order: [['used', 'DESC']],
    limit,
    offset,
  });
  return tags;
};

const getTagDetail = async (_, { language, tag }) => {
  const Tag = await databaseUtils().loadModel(TABLES.TAG_TABLE);
  return Tag.findOne({
    where: {
      language,
      title: tag,
    },
  });
};

export { getAllTags, getTagDetail };

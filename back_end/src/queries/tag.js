const database = require('../db/database').getDatabase();
const tables = require('../db/constants').TABLES;

module.exports.getAllTags = async (_, { offset, limit }) => {
  const Tag = database.loadModel(tables.TAG_TABLE);
  const tags = await Tag.findAll({
    order: [['used', 'DESC']],
    limit,
    offset,
  });
  return tags;
};

module.exports.getTagDetail = async (parent, { tag }) => {
  const Tag = await database.loadModel(tables.TAG_TABLE);
  return Tag.findOne({
    where: {
      title: tag,
    },
  });
};

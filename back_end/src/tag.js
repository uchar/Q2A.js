const dbUtils = require('./database').getUtils();
const tables = require('./database').getTables();

module.exports.getAllTags = async (_, { offset, limit }) => {
  const Tag = dbUtils.loadModel(tables.TAG_TABLE);

  const tags = await Tag.findAll({
    order: [['used', 'DESC']],
    limit,
    offset,
  });
  return tags;
};

module.exports.getTagDetail = async (parent, { tag }) => {
  const Tag = await dbUtils.loadModel(tables.TAG_TABLE);

  return Tag.findOne({
    where: {
      title: tag,
    },
  });
};

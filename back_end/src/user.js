const dbUtils = require('./database').getUtils();
const tables = require('./database').getTables();

module.exports.getUser = async (parent, { id }) => {
  const User = await dbUtils.loadModel(tables.USER_TABLE);
  const user = await User.findOne({
    where: {
      publicName: id,
    },
  });
  return user;
};

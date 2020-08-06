const { findUserByName } = require('../utility');
const database = require('../db/database').getDatabase();
const tables = require('../db/constants').TABLES;

module.exports.getUser = async (_, params, context) => {
  if (!params.id && !context.user) {
    throw new Error("You're not authorized");
  }
  const id = params.id ? params.id : context.user.publicName;
  return findUserByName(id);
};
module.exports.getNotifications = async (_, { limit, offset }, context) => {
  if (!context.user) {
    throw new Error("You're not authorized");
  }
  const User = await database.loadModel(tables.USER_TABLE);
  const { id } = context.user;
  return User.findAll({
    where: { userId: id },
    order: [['createdAt', 'DESC']],
    limit,
    offset,
  });
};

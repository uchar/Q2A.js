const database = require('../db/database').getDatabase();
const tables = require('../db/constants').TABLES;

module.exports.getUser = async (_, params, context) => {
  if (!params.id && !context.user) {
    throw new Error("You're not authorized");
  }
  const id = params.id ? params.id : context.user.publicName;
  const User = await database.loadModel(tables.USER_TABLE);
  return User.findOne({
    where: {
      publicName: id,
    },
  });
};

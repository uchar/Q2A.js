const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const database = require('./db/database').getDatabase();
const tables = require('./db/constants').TABLES;
const { isLegacyPasswordValid, STATUS_CODES } = require('./utility');

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

const createJWTToken = (user) => {
  const token = jwt.sign({ id: user.id, publicName: user.publicName }, process.env.JWT_SECRET, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });
  return token;
};

module.exports.login = async (_, { username, password }) => {
  const User = await database.loadModel(tables.USER_TABLE);
  const user = await User.findOne({
    where: {
      publicName: username,
    },
  });
  if (!user) {
    throw new Error(STATUS_CODES.NO_USER);
  }
  if (user.isLegacyAuthentication) {
    const isValid = isLegacyPasswordValid(password, user.legacyPasswordSalt, user.legacyPassword);
    if (isValid) {
      const newPasswordHash = await bcrypt.hash(password, 10);
      await User.update(
        {
          password: newPasswordHash,
          isLegacyAuthentication: false,
          legacyPassword: null,
          legacyPasswordSalt: null,
        },
        { where: { id: user.id } }
      );
      return createJWTToken(user);
    }
    throw new Error(STATUS_CODES.INVALID_LOGIN);
  } else {
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      return createJWTToken(user);
    }
    throw new Error(STATUS_CODES.INVALID_LOGIN);
  }
};

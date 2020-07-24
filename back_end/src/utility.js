const hashEquals = require('hash-equals');
const crypto = require('crypto');

module.exports.STATUS_CODES = {
  INVALID_LOGIN: 'INVALID_LOGIN',
  NO_USER: 'NO_USER',
  SUCCESS: 'SUCCESS',
};

const legacyHash = (password, salt) => {
  return crypto
    .createHash('sha1')
    .update(salt.substr(0, 8) + password + salt.substr(8, salt.length))
    .digest();
};
module.exports.isLegacyPasswordValid = (password, salt, hashToCheckAgainst) => {
  return hashEquals(legacyHash(password, salt.toString()).toString(), hashToCheckAgainst.toString());
};

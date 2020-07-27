const hashEquals = require('hash-equals');
const crypto = require('crypto');

module.exports.STATUS_CODE = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  OTHER_ERROR: 'OTHER_ERROR',
  SUCCESS: 'SUCCESS',
};

module.exports.createValidationResponse = (message) => {
  return {
    statusCode: this.STATUS_CODE.VALIDATION_ERROR,
    message,
  };
};

module.exports.createSuccessResponse = (message = '') => {
  return {
    statusCode: this.STATUS_CODE.SUCCESS,
    message,
  };
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

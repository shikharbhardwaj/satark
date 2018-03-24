const bcrypt = require('bcryptjs');

/**
 * Compare the input password with the stored one.
 * @param {String} userPassword The password input.
 * @param {String} databasePassword The password from the database.
 * @return {bool} Whether the comparision yields true or false.
 */
function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

module.exports = {
  comparePass,
};

const bcrypt = require('bcryptjs');
const knex = require('../db/connection');

/**
 * Compare the input password with the stored one.
 * @param {String} userPassword The password input.
 * @param {String} databasePassword The password from the database.
 * @return {bool} Whether the comparision yields true or false.
 */
function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

/**
 * Create user according to the data in the request object.
 * @param {Object} req The request object.
 * @return {Object}
 */
function createUser(req) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  return knex('users')
  .insert({
    username: req.body.username,
    password: hash,
  })
  .returning('*');
}

module.exports = {
  comparePass,
  createUser,
};

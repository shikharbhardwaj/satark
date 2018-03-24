const bcrypt = require('bcryptjs');
const knex = require('../db/connection');

/**
 * Compare password equality.
 *
 * @param {string} userPassword - The password supplied.
 * @param {string} databasePassword - The stored password.
 * @return {bool} - The comparision.
 */
function comparePass(userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword);
}

/**
 * Create a new user.
 * @param {Object} req The request object.
 * @return {Object} The modified collection.
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

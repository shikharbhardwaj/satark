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

/**
 * Require login for progression.
 * @param {Object} req The request object.
 * @param {Object} res The reponse object.
 * @param {Object} next The next callback.
 * @return {Object} The invocation of the callback.
 */
function loginRequired(req, res, next) {
  if (!req.user) return res.status(401).json({status: 'Please log in.'});
  return next();
}

/**
 * Redirect if user is logged in.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {function} next Callback.
 * @return {Object}
 */
function loginRedirect(req, res, next) {
  if (req.user) {
    return res.status(401).json({status: 'You are already logged in'});
  }
  return next();
}

module.exports = {
  comparePass,
  createUser,
  loginRequired,
  loginRedirect,
};

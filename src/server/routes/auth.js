const express = require('express');
const router = new express.Router();

const authHelpers = require('../auth/_helpers');
const passport = require('../auth/local');

/**
 * Handle response with given status code.
 * @param {Object} res The response object.
 * @param {Int} code HTTP response status code.
 * @param {String} statusMsg The message string.
 */
function handleResponse(res, code, statusMsg) {
  res.status(code).json({status: statusMsg});
}

router.post('/register', (req, res, next) => {
  return authHelpers.createUser(req, res)
    .then((response) => {
      passport.authenticate('local', (err, user, info) => {
        if (user) {
          handleResponse(res, 200, 'success');
        }
      })(req, res, next);
    })
    .catch((err) => {
      handleResponse(res, 500, 'error');
    });
});

module.exports = router;

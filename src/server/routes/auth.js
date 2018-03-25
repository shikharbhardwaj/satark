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

router.post('/register', authHelpers.loginRedirect, (req, res, next) => {
  return authHelpers.createUser(req, res)
    .then((user) => {
      handleLogin(res, user[0]);
    })
    .then(() => {
      handleResponse(res, 200, 'success');
    })
    .catch((err) => {
      handleResponse(res, 500, 'error');
    });
});

router.post('/login', authHelpers.loginRedirect, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      handleResponse(res, 500, 'error');
    }
    if (!user) {
      handleResponse(res, 404, 'User not found');
    }
    if (user) {
      req.logIn(user, (err) => {
        if (err) {
          handleResponse(res, 500, 'error');
        }
        handleResponse(res, 200, 'success');
      });
    }
  })(req, res, next);
});

router.get('/logout', authHelpers.loginRequired, (req, res, next) => {
  req.logout();
  handleResponse(res, 200, 'success');
});

module.exports = router;

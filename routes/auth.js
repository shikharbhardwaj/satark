const express = require('express');
const router = new express.Router();

const authHelpers = require('../auth/_helpers');
const passport = require('../auth/local');

/**
 * Set the response status of the HTTP request.
 * @param {Object} res The response object.
 * @param {Int} code The HTTP response code.
 * @param {String} statusMsg The status message.
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

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      handleResponse(res, 500, 'error');
    }
    if (!user) {
      handleResponse(res, 404, 'User not found');
    }
    if (user) {
      req.logIn(user, function(err) {
        if (err) {
          handleResponse(res, 500, 'error');
        }
        handleResponse(res, 200, 'success');
      });
    }
  })(req, res, next);
});

router.get('/logout', (req, res, next) => {
  req.logout();
  handleResponse(res, 200, 'success');
});

module.exports = router;

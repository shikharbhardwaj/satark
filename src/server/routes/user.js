const express = require('express');
const router = new express.Router();

const authHelpers = require('../auth/_helpers');

router.get('/user', authHelpers.loginRequired, (req, res, next) => {
  handleResponse(res, 200, 'success');
});

/**
 * Handle response with given status code.
 * @param {Object} res The response object.
 * @param {Int} code HTTP response status code.
 * @param {String} statusMsg The message string.
 */
function handleResponse(res, code, statusMsg) {
  res.status(code).json({status: statusMsg});
}

module.exports = router;

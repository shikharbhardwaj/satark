const express = require('express');
const router = express.Router();

const authHelpers = require('../auth/_helpers');

// router.get('/user', authHelpers.loginRequired, (req, res, next)  => {
//   handleResponse(res, 200, 'success');
// });

router.get('/admin', (req, res, next)  => {
  res.render('admin', {title: 'Dashboard | Satark'});
});

function handleResponse(res, code, statusMsg) {
  res.status(code).json({status: statusMsg});
}

module.exports = router;

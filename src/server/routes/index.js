const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');

router.get('/', function (req, res, next) {
  res.render('index', {title: 'Satark'});
});

router.get('/login', function (req, res, next) {
  res.render('login', {title: 'Administrator login | Satark'});
});

module.exports = router;

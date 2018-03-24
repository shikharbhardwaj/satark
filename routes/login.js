const express = require('express');
const router = new express.Router();

router.get('/login', function(req, res) {
  res.render('login', {title: 'Satark | Administrator login'});
});

module.exports = router;

const express = require('express');
const router = new express.Router();

router.get('/analytics', function(req, res) {
  res.render('analysis', {title: 'Satark | Crime data analysis'});
});

module.exports = router;

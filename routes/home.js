const express = require('express');
const router = new express.Router();

router.get('/', function(req, res) {
    res.render('home', {title: 'Satark'});
});

module.exports = router;

const express = require('express');
const path = require('path');

// Initialize app.
const app = express();

// Set view folder.
app.set('views', path.join(__dirname, 'views'));

// Set external static assets folder.
app.use('/deps', express.static(path.join(__dirname, 'node_modules', '@bower_components')));

// Set internal static assets folder.
app.use('/assets', express.static(path.join(__dirname, 'public')));

// Set the view engine.
app.set('view engine', 'pug');

// Home route(crime map).
app.get('/', function(req, res) {
  res.render('home', {title: 'Crime map'});
});

// Analytics route.
app.get('/analysis', function(req, res) {
  res.render('analysis', {title: 'Crime data analysis'});
});

// Start server.
app.listen(3000, function() {
  console.log('Server started on port 3000');
});

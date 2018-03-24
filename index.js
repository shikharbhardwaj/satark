const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');

// Initialize app.
const app = express();

// Set view folder.
app.set('views', path.join(__dirname, 'views'));

// Set external static assets folder.
app.use('/deps', express.static(path.join(__dirname, 'node_modules',
        '@bower_components')));

// Set internal static assets folder.
app.use('/', express.static(path.join(__dirname, 'public')));

// Middleware setup.
app.set('view engine', 'pug');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// We'll use express-session to manage sessions.
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// Home route(crime map).
app.get('/', function(req, res) {
  res.render('home', {title: 'Satark'});
});

// Analytics route.
app.get('/analytics', function(req, res) {
  res.render('analysis', {title: 'Satark | Crime data analysis'});
});

// Admin route.
app.get('/login', function(req, res) {
  res.render('login', {title: 'Satark | Administrator login'});
});

// Start server.
app.listen(3000, function() {
  console.log('Server started on port 3000');
});

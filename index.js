const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');

require('dotenv').config()

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

// App routes.
const home = require('./routes/home');
const analytics = require('./routes/analytics');
const login = require('./routes/login');

app.use('/', home);
app.use('/', analytics);
app.use('/', login);

// Start server.
app.listen(3000, function() {
  console.log('Server started on port 3000');
});

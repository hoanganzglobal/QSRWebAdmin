const express = require('express');
const app = express();
const port = 3008;
const middleware = require('./middleware');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
require('dotenv/config');

app.use(cors());
app.options('*', cors());

// Middleware
app.use(express.json());
app.use(morgan('tiny'));

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'I-love-my-dog',
    resave: true,
    saveUninitialized: false,
  })
);

// Routes
app.use('/login', require('./controllers/loginController'));
app.use('/logout', require('./controllers/logoutController'));
app.use('/orders', middleware.requireLogin, require('./controllers/orderController'));
app.use('/promotions', middleware.requireLogin, require('./controllers/promotionController'));

app.get('/', middleware.requireLogin, (req, res, next) => {
  var userLoggedIn = req.session.user ? req.session.user : {};
  var payload = {
    payTitle: 'Home',
    userLoggedIn: userLoggedIn,
  };

  res.status(200).render('home', payload);
});

const server = app.listen(port, () => {
  console.log('server listening on port ' + port);
});

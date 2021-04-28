const express = require('express');
const app = express();
const router = express.Router();

var numbro = require("numbro");

router.get('/', (req, res, next) => {
  var data = [];

  var userLoggedIn = req.session.user ? req.session.user : {};
  var payload = {
    payTitle: 'Orders',
    userLoggedIn: userLoggedIn,
    data: data
  };

  res.status(200).render('orders', payload);
});

module.exports = router;

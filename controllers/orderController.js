const express = require('express');
const app = express();
const router = express.Router();
const orderService = require('../services/orderService');

router.post('/', getOrders);

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

function getOrders(req, res, next) {
  var userLoggedIn = req.session.user ? req.session.user : {};
  var t = new Promise((resolve, reject) => {
    orderService
      .getOrders(userLoggedIn)
      .then((payload) => {
        resolve(payload);
      })
      .catch((err) => next(err));
  });

  return t.then((payload) => {
    return res.status(200).json(payload);
  });
}

const express = require('express');
const app = express();
const router = express.Router();
const userService = require('../services/userService');

app.set('view engine', 'pug');
app.set('views', 'views');

router.get('/', (req, res, next) => {
  res.status(200).render('login');
});

router.post('/', login);

module.exports = router;

function login(req, res, next) {
  if (req.body.logUsername && req.body.logPassword) {
    var data = {
      loginName: req.body.logUsername,
      password: req.body.logPassword,
    };
    var t = new Promise((resolve, reject) => {
      userService
        .login(data)
        .then((payload) => {
          resolve(payload);
        })
        .catch((err) => next(err));
    });

    return t.then((data) => {
      if (data.success === true) {
        req.session.user = data.user;
        return res.redirect('/');
      } else {
        return res
          .status(200)
          .render('login', { errorMessage: data.errorMessage });
      }
    });
  }

  res.status(200).render('login');
}

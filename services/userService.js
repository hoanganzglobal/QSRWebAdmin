const axios = require('axios');
const { response } = require('express');

const api = process.env.API_URL;

module.exports = {
  login,
};

async function login({ loginName, password }) {
  var payload = {};

  var data = {
    loginName: loginName,
    password: password,
  };

  var config = {
    method: 'post',
    url: `${api}/users/login`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  var t = new Promise((resolve, reject) => {
    axios(config)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });

  return t.then(response => {
    if (response) {
      var data = response.data;
      return data;
    }
  }).catch(err => {
      payload.success = false;
      payload.errorMessage = err;
      return payload;
  });
}

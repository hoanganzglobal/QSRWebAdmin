const axios = require('axios');
const api = process.env.API_URL;
const fs = require('fs');
const path = require('path');

module.exports = {
  getOrders,
};

async function getOrders(userLoggedIn) {
  var payload = {};

  var config = {
    method: 'get',
    url: `${api}/orders`,
    headers: {
      'Authorization': 'Bearer ' + userLoggedIn.accessToken,
      'Content-Type': 'application/json',
    },
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

  return t
    .then((response) => {
      if (response) {
        var data = response.data;
        return data;
      }
    })
    .catch((err) => {
      payload.success = false;
      payload.errorMessage = err;
      return payload;
    });
}

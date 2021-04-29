var settings = {
    "url": "http://localhost:3003/vouchers/random3rdVoucher",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Authorization": "Bearer " + userLoggedIn.accessToken,
      "Content-Type": "application/json"
    },
    "data": JSON.stringify({
      "campaignID": "1",
      "sourceID": "lazada",
      "transactionID": "1111117"
    }),
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });
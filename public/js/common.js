var SOCKET_URL = 'http://qsrapi.qsrvietnam.com:3003';

var statusCodeToString = {
  10: 'Pending',
  12: 'First Order',
  15: 'POS Received',
  18: 'Cooking',
  20: 'Cooked',
  25: 'On The Way',
  28: 'Delivered',
  30: 'Completed',
  40: 'Void',
};

var syncStatus = {
  113: 'Not Push',
  200: 'Pushing',
  202: 'Pushed',
};

var orderChannelToString = {
  13: 'Call Center',
  14: 'Online',
  70: 'VNMM',
};

var paymentMethodToString = {
  'Payments.CashOnDelivery': 'COD',
  'Payments.Momo': 'Momo',
  'Payments.SacombankPay': 'Sacombank',
};

var paymentStatusToString = {
  10: 'Pending',
  20: 'Waiting',
  30: 'Paid',
  40: 'Void',
  50: 'Refund',
};

var orderMethodToString = {
  false: 'DE',
  true: 'TA',
};

function numberWithCommas(x) {
  return x.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function NotifyMe(title, message) {
  var options = {
    body: message,
    icon: '/images/icon.png',
    timeout: 3000,
    dir: 'ltr',
  };

  var notification = null;
  if (!('Notification' in window)) {
    console.log('This browser does not support desktop notification');
  } else if (Notification.permission === 'granted') {
    var notification = new Notification(title, options);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(function (permission) {
      if (permission === 'granted') {
        var notification = new Notification(title, options);
      }
    });
  }

  if (notification) {
    notification.onclick = function (event) {
      event.preventDefault();
      window.open('https://thepizzacompany.vn', '_blank');
    };
  }
}

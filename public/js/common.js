var SOCKET_URL = 'http://localhost:3003';

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

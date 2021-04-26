var socketOptions = {
  'force new connection': true,
  reconnectionAttempts: 'Infinity',
  timeout: 10000,
  transports: ['websocket'],
};

var statusCodeToString = {
  15: 'POS Received',
  18: 'Cooking',
  20: 'Cooked',
  25: 'On The Way',
  28: 'Delivered',
  30: 'Completed',
  40: 'Void',
};

var socket = io(SOCKET_URL, socketOptions);

socket.on('notify order update', (data) => {
  alertify.set('notifier', 'position', 'top-right');
  alertify.success(
    'New update status of order id <b>' +
      data.data.Id +
      ' is: ' +
      statusCodeToString[data.data.OrderStatusId] +
      '</b>',
    2
  );
  
  var message =
    'New update status of order id ' +
    data.data.Id +
    ' is: ' +
    statusCodeToString[data.data.OrderStatusId];
  NotifyMe('Notify order updated!', message);

  if ($('#Notify').hasClass('badge-notify') == false) {
    document
      .getElementById('Notify')
      .classList.add('badge', 'badge-notify', 'badge-pill');
  }
  var countNotifyStr = document.getElementById('Notify').innerHTML;
  var countNotify = countNotifyStr.length === 0 ? 0 : parseInt(countNotifyStr);
  countNotify++;
  document.getElementById('Notify').innerHTML = countNotify.toString();
});

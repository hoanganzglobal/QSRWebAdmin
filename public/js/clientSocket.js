var socketOptions = {
  'force new connection': true,
  reconnectionAttempts: 'Infinity',
  timeout: 10000,
  transports: ['websocket'],
};

var socket = io(SOCKET_URL, socketOptions);

socket.on('notify order insert', (data) => {
  alertify.set('notifier', 'position', 'top-right');
  alertify.success(
    'New order id is <b>' +
      data.data.Id +
      '</b>',
    2
  );
  
  var message =
    'New order id is ' +
    data.data.Id;
  NotifyMe('Notify new order!', message);

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

const { removeVI } = jsrmvi;

$(document).ready(function () {
  var table = $('#eg2-0').DataTable({
    data: [],
    deferRender: true,
    orderCellsTop: true,
    //fixedHeader: true,
    //searchHighlight: true,
    //searching: false,
    select: true,
    //scrollY: "200px",
    //scrollX: true,
    lengthMenu: [
      [10, 25, 50, -1],
      [10, 25, 50, 'All'],
    ],
    order: [[0, 'desc']],
    language: {
      url: '/js/languages/vi.json',
    },
    initComplete: function () {
      $('.dataTables_wrapper input[type=search]')
        .off()
        .on('keyup', function () {
          if (this.value.length >= 3 || this.value.length === 0) {
            table.search(this.value).draw();
          }
        });

      $('.dataTables_wrapper input[type=search]').on('search', function () {
        $(this).val('');
        table.search('').draw();
      });

      var api = this.api();
      api.$('td').click(function () {
        api.search(this.innerHTML).draw();
      });
    },
  });

  loadOrders(table);
  $('#ReloadTable').click(function () {
    loadOrders(table);
  })

  socket.on('notify order insert', (data) => {
    const jrow = [
      data.data.Id,
      'TPC',
      data.data.ShopName,
      orderChannelToString[data.data.OrderChannel],
      paymentMethodToString[data.data.PaymentMethodSystemName],
      changeBadgeOrderStatus(data.data.OrderStatusId),
      changeBadgePaymentStatus(data.data.PaymentStatusId),
      orderMethodToString[data.data.PickupInStore],
      data.data.CustomerPhone + ' | ' + data.data.CustomerName,
      changeBadgeSyncStatus(data.data.syncStatus),
      data.data.OrderDate,
      data.data.DeliveryTime,
      data.data.Total,
    ];
    table.row.add(jrow).draw();
    syncOrderToTable(orderTable, data.data);
  });

  socket.on('notify order update', (data) => {
    table.rows().every(function (rowIdx, tableLoop, rowLoop) {
      var rowData = this.data();
      if (data.data.Id === rowData[0]) {
        rowData[5] = changeBadgeOrderStatus(data.data.OrderStatusId);
        rowData[6] = changeBadgePaymentStatus(data.data.PaymentStatusId);
        rowData[9] = changeBadgeSyncStatus(data.data.syncStatus);
        table.row(this).data(rowData).draw();
      }
    });
    syncOrderToTable(orderTable, data.data);
  });

  $('#eg2-0 thead tr:eq(1) th').each(function (i) {
    $('input', this).on('keyup', function () {
      var val = '';
      if (i !== $('#eg2-0 thead tr:eq(1) th').length - 1) {
        val = this.value;
      } else {
        $(this).val(
          $(this)
            .val()
            .replace(/[^0-9]/g, '')
        );
        val = numberWithCommas($(this).val());
      }
      if (val.length >= 3 || val.length === 0) {
        if (table.column(i).search() !== val) {
          table.column(i).search(val).draw();
        }
      }
    });

    $('select', this).on('change', function () {
      var val = this.value;
      if (table.column(i).search() !== val) {
        table
          .column(i)
          //.search(val)
          .search(val ? '^' + val + '$' : '', true, false)
          .draw();
      }
    });
  });

  table
    .on('select', function (e, dt, type, indexes) {
      var rowData = table.rows(indexes).data().toArray();
      var data = rowData[0];
      alert(data);
    })
    .on('deselect', function (e, dt, type, indexes) {
      var rowData = table.rows(indexes).data().toArray();
      var data = rowData[0];
      alert(data[0]);
    });
});

function parseDataToTable(data = []) {
  return data.map((r) => {
    const {
      orderCode,
      orderBrandCode,
      orderShopName,
      orderChannel,
      orderPaymentMethod,
      orderStatus,
      orderPaymentStatus,
      orderMethod,
      orderCustomerInfo,
      orderSyncStatus,
      orderCreatedAt,
      orderDeliveryTime,
      orderTotal,
    } = r;
    return [
      orderCode,
      orderBrandCode,
      orderShopName,
      orderChannelToString[orderChannel],
      paymentMethodToString[orderPaymentMethod],
      changeBadgeOrderStatus(orderStatus),
      changeBadgePaymentStatus(orderPaymentStatus),
      orderMethodToString[orderMethod],
      orderCustomerInfo,
      changeBadgeSyncStatus(orderSyncStatus),
      orderCreatedAt,
      orderDeliveryTime,
      orderTotal,
    ];
  });
}

function changeBadgeOrderStatus(statusId) {
  var html = '';
  switch (statusId) {
    case 10:
      html =
        '<div class="badge badge-pending">' +
        statusCodeToString[statusId] +
        '</div>';
      break;
    case 12:
    case 13:
    case 14:
      html =
        '<div class="badge badge-first">' +
        statusCodeToString[statusId] +
        '</div>';
      break;
    case 15:
      html =
        '<div class="badge badge-confirmed">' +
        statusCodeToString[statusId] +
        '</div>';
      break;
    case 18:
      html =
        '<div class="badge badge-cooking">' +
        statusCodeToString[statusId] +
        '</div>';
      break;
    case 20:
      html =
        '<div class="badge badge-cooked">' +
        statusCodeToString[statusId] +
        '</div>';
      break;
    case 25:
      html =
        '<div class="badge badge-ontheway">' +
        statusCodeToString[statusId] +
        '</div>';
      break;
    case 28:
      html =
        '<div class="badge badge-delivered">' +
        statusCodeToString[statusId] +
        '</div>';
      break;
    case 30:
      html =
        '<div class="badge badge-completed">' +
        statusCodeToString[statusId] +
        '</div>';
      break;
    case 40:
      html =
        '<div class="badge badge-void">' +
        statusCodeToString[statusId] +
        '</div>';
      break;
    default:
      html = statusCodeToString[statusId];
      break;
  }

  return html;
}

function changeBadgePaymentStatus(statusId) {
  var html = '';
  switch (statusId) {
    case 10:
      html =
        '<div class="badge badge-pending">' +
        paymentStatusToString[statusId] +
        '</div>';
      break;
    case 20:
      html =
        '<div class="badge badge-cooked">' +
        paymentStatusToString[statusId] +
        '</div>';
      break;
    case 30:
      html =
        '<div class="badge badge-completed">' +
        paymentStatusToString[statusId] +
        '</div>';
      break;
    case 40:
      html =
        '<div class="badge badge-void">' +
        paymentStatusToString[statusId] +
        '</div>';
      break;
    case 50:
      html =
        '<div class="badge badge-refund">' +
        paymentStatusToString[statusId] +
        '</div>';
      break;
    default:
      html = paymentStatusToString[statusId];
      break;
  }

  return html;
}

function changeBadgeSyncStatus(statusId) {
  var html = '';
  statusId = parseInt(statusId) ? parseInt(statusId) : 0;
  switch (statusId) {
    case 113:
      html =
        '<div class="badge badge-danger">' + syncStatus[statusId] + '</div>';
      break;
    case 200:
      html =
        '<div class="badge badge-warning">' + syncStatus[statusId] + '</div>';
      break;
    case 202:
      html =
        '<div class="badge badge-completed">' + syncStatus[statusId] + '</div>';
      break;
    default:
      html = '';
      break;
  }

  return html;
}

function loadOrders(table) {
  $('#eg2-0').LoadingOverlay('show');
  var settings = {
    url: 'http://qsrapi.qsrvietnam.com:7007/orders',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  $.ajax(settings).done(function (response) {
    orderTable = [];
    var orders = response.data;
    for (var i = 0; i < orders.length; i++) {
      orderTable.push(orders[i]);
    }
    $('#eg2-0').LoadingOverlay("hide", true);
    const rows = parseDataToTable(orderTable);
    table.clear().draw();
    table.rows.add(rows).draw();
  });
}

function syncOrderToTable(orderTable, order) {
  if (orderTable.length == 0) {
    addOrderToTable(orderTable, order);
  }
  else {
    let index = -1;
    for (var i = 0; i < orderTable.length; i++) {
      let orderT = orderTable[i];
      if (orderT.orderCode == order.Id) {
        index = i;
        break;
      }
    }
    if (index == -1) {
      addOrderToTable(orderTable, order);
    } else {
      let orderT = orderTable[index];
      orderT.orderStatus = order.OrderStatusId;
      orderT.orderPaymentStatus = order.PaymentStatusId;
      orderT.orderSyncStatus = order.syncStatus;
      orderTable[index] = orderT;
    }
  }
}

function addOrderToTable(orderTable, order) {
  orderTable.push({
    orderCode: order.Id,
    orderBrandCode: 'TPC',
    orderShopName: order.ShopName,
    orderChannel: order.OrderChannel,
    orderPaymentMethod: order.PaymentMethodSystemName,
    orderStatus: order.OrderStatusId,
    orderPaymentStatus: order.PaymentStatusId,
    orderMethod: order.PickupInStore,
    orderCustomerInfo: order.CustomerPhone + ' | ' + order.CustomerName,
    orderSyncStatus: order.syncStatus,
    orderCreatedAt: order.OrderDate,
    orderDeliveryTime: order.DeliveryTime,
    orderTotal: order.Total
  });
}

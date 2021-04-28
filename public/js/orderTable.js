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

  let orders = (JSON.parse(localStorage.getItem('orders'))) ? JSON.parse(localStorage.getItem('orders')) : [];
  if (orders.length > 0) {
    for (var i = 0; i < orders.length; i++) {
      let order = JSON.parse(orders[i]);
      orderTable.push({
        orderCode: order.Id,
        orderBrandCode: "TPC",
        orderShopName: order.ShopName,
        orderChannel: orderChannelToString[order.OrderChannel],
        orderPaymentMethod: paymentMethodToString[order.PaymentMethodSystemName],
        orderStatus: statusCodeToString[order.OrderStatusId],
        orderPaymentStatus: paymentStatusToString[order.PaymentStatusId],
        orderMethod: orderMethodToString[order.PickupInStore],
        orderCustomerInfo: order.CustomerPhone + ' | ' + order.CustomerName,
        orderCreatedAt: order.OrderDate,
        orderDeliveryTime: order.DeliveryTime,
        orderTotalAmount: order.Total,
      });
    }
    const rows = parseDataToTable(orderTable);
    table.rows.add(rows).draw();
  }

  socket.on('notify order insert', (data) => {
    const jrow = [
      data.data.Id,
      'TPC',
      data.data.RK7RestaurantId,
      orderChannelToString[data.data.OrderChannel],
      paymentMethodToString[data.data.PaymentMethodSystemName],
      statusCodeToString[data.data.OrderStatusId],
      paymentStatusToString[data.data.PaymentStatusId],
      orderMethodToString[data.data.PickupInStore],
      data.data.CustomerPhone + " | " + data.data.CustomerName,
      data.data.OrderDate,
      data.data.DeliveryTime,
      data.data.Total,
    ];
    table.row.add(jrow).draw();
    syncOrderToTable(data.data);
  });

  socket.on('notify order update', (data) => {
    table.rows().every(function (rowIdx, tableLoop, rowLoop) {
      var rowData = this.data();
      if (data.data.orderNum === rowData[0]) {
        rowData[5] = statusCodeToString[data.data.OrderStatusId];
        rowData[6] = statusCodeToString[data.data.PaymentStatusId];
        table.row(this).data(rowData).draw();
      }
    });
    syncOrderToTable(data.data);
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
      orderCreatedAt,
      orderDeliveryTime,
      orderTotalAmount,
    } = r;
    return [
      orderCode,
      orderBrandCode,
      orderShopName,
      orderChannel,
      orderPaymentMethod,
      orderStatus,
      orderPaymentStatus,
      orderMethod,
      orderCustomerInfo,
      orderCreatedAt,
      orderDeliveryTime,
      orderTotalAmount,
    ];
  });

  function syncOrderToTable(order) {
    let orders = (JSON.parse(localStorage.getItem('orders'))) ? JSON.parse(localStorage.getItem('orders')) : [];
    if (localStorage.getItem("orders") === null || cart.length === 0) {
      orders = [];
      orders.push(JSON.stringify(order));
      localStorage.setItem("orders", JSON.stringify(orders));
    }
    else {
      let index = -1;
      for (var i=0; i < orders.length; i++) {
        let orderT = JSON.parse(orders[i]);
        if (orderT.Id === order.Id) {
          index = i;
          break;
        }
      }
      if (index == -1) {
        orders.push(JSON.stringify(order));
      }
      else {
        let orderT = JSON.parse(orders[index]);
        orderT.OrderStatusId = order.OrderStatusId;
        orderT.PaymentStatusId = order.PaymentStatusId;
        orderT.SyncStatus = order.SyncStatus;
      }
      localStorage.setItem("orders", JSON.stringify(orders));
    }
  }
}

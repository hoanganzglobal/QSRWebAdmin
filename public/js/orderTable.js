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

  const rows = parseDataToTable(orderTable);
  table.rows.add(rows).draw();

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
          .search( val ? '^'+val+'$' : '', true, false )
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
}

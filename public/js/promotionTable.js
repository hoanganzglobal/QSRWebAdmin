$(document).ready(function () {
  $("#MemoDateIssueInput").datepicker({
    "dateFormat": "dd/mm/yy"
  });

  var table = $('#eg2-0').DataTable({
    orderCellsTop: true,
    fixedHeader: true,
    //searchHighlight: true,
    //searching: false,
    select: true,
    //scrollY: "200px",
    //"dom": '<"toolbar">',
    lengthMenu: [
      [10, 25, 50, -1],
      [10, 25, 50, 'All'],
    ],
    "pagingType": "full_numbers",
    order: [[3, 'desc']],
    language: {
      url: '/js/languages/vi.json',
    },
    "columns": [
      {
        "class": "details-control",
        "orderable": false,
        "data": null,
        "defaultContent": ""
      },
      { "data": "memoNumber" },
      { "data": "memoName" },
      { "data": "memoDateIssue" },
      { "data": "memoFromDate" },
      { "data": "memoToDate" },
      { "data": "memoFile" },
    ],
    initComplete: function () {
      $('.dataTables_wrapper input[type=search]').off().on('keyup', function () {
        if (this.value.length >= 3 || this.value.length === 0) {
          table.search(this.value).draw();
        }
      });
      $('.dataTables_wrapper input[type=search]').on('search', function () {
        $(this).val('');
        table.search('').draw();
      });
      //$("div.toolbar").html('<bot>Custom tool bar! Text/images etc.</bottom>');
    },
  });

  $('#eg2-0 thead tr:eq(1) th').each(function (i) {
    $('input', this).on('keyup change', function () {
      val = this.value;
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
          .search(val)
          .draw();
      }
    });
  });

  table
    .on('select', function (e, dt, type, indexes) {
      var rowData = table.rows(indexes).data().toArray();
      var data = rowData[0];
      alert(data[0]);
    })
    .on('deselect', function (e, dt, type, indexes) {
      var rowData = table.rows(indexes).data().toArray();
      var data = rowData[0];
      alert(data[0]);
    });
});

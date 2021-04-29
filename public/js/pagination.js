var data = [
    {
        orderCode: "172156",
        orderShopName: "TPC Phạm Hùng",
        orderChannel: "Online",
        orderPaymentMethod: "COD",
        orderStatus: "First Order",
        orderPaymentStatus: "Đang chờ xử lý",
        orderDeliveryMethod: "Chưa được vận chuyển",
        orderCustomerInfo: "0968608764 | Mai Phạm",
        orderCreatedAt: "16/04/2021 04:29:42"
    },
    {
        orderCode: "172155",
        orderShopName: "TPC Pegasus",
        orderChannel: "Online",
        orderPaymentMethod: "Momo",
        orderStatus: "First Big Order",
        orderPaymentStatus: "Đã thanh toán",
        orderDeliveryMethod: "Nhận tại cửa hàng",
        orderCustomerInfo: "0848170086 | Nam",
        orderCreatedAt: "16/04/2021 00:20:20"
    },
    {
        orderCode: "172154",
        orderShopName: "TPC 515 Lê Văn Sỹ",
        orderChannel: "Online",
        orderPaymentMethod: "COD",
        orderStatus: "Cooking",
        orderPaymentStatus: "Đang chờ xử lý",
        orderDeliveryMethod: "Chưa được vận chuyển",
        orderCustomerInfo: "0833030307 | Nguyễn Minh Ngân",
        orderCreatedAt: "15/04/2021 22:56:36"
    }
]

var list = [];
var pageList = [];
var currentPage = 1;
var numberPerPage = 2;
var numberOfPages = 0;

function loadList() {
    drawList();
    check();
}

function check() {
    document.getElementById("next").disabled = currentPage == numberOfPages ? true : false;
    document.getElementById("previous").disabled = currentPage == 1 ? true : false;
}

function makeList() {
    numberOfPages = getNumberOfPages();
}

function getNumberOfPages() {
    return Math.ceil(data.length / numberPerPage);
}

function nextPage(pageNum) {
    currentPage = pageNum;
    loadList();
}

function previousPage() {
    (currentPage > 1) ? currentPage -= 1 : currentPage;
    loadList();
}

function firstPage() {
    currentPage = 1;
    loadList();
}

function lastPage() {
    currentPage = numberOfPages;
    loadList();
}

function drawList() {
    var drawPagination = document.getElementById("drawPagination");
    var html  = "";
        html += '<a href="javascript:void(0);" id="previous" onclick="previousPage()"><i class="fa fa-arrow-left"></i></a>';
    for (r = 0; r < numberOfPages; r++) {
        if (currentPage == (r + 1)) {
            html += '<a href="javascript:void(0);" class="active">' + (r + 1) + '</a>';
        } else {
            html += '<a href="javascript:nextPage(' + (r + 1) + ')">' + parseInt(r + 1) + '</a>';
        }
    }
    if (currentPage < numberOfPages) {
        html += '<a href="javascript:nextPage(' + (currentPage + 1) + ');" id="next"><i class="fa fa-arrow-right"></i></a>';
    } else {
        html += '<a href="javascript:nextPage(' + currentPage + ');" id="next"><i class="fa fa-arrow-right"></i></a>';
    }
    drawPagination.innerHTML = html;
}

function load() {
    makeList();
    loadList();
}

load();
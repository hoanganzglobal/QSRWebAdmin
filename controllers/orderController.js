const express = require('express');
const app = express();
const router = express.Router();

var numbro = require("numbro");

router.get('/', (req, res, next) => {
  var data = [
    {
      orderCode: '172156',
      orderBrandCode: 'TPC',
      orderShopName: 'TPC Phạm Hùng',
      orderChannel: 'Online',
      orderPaymentMethod: 'COD',
      orderStatus: 'First Order',
      orderPaymentStatus: 'Đang chờ xử lý',
      orderMethod: 'DE',
      orderCustomerInfo: '0968608764 | Mai Phạm',
      orderCreatedAt: '16/04/2021 04:29:42',
      orderDeliveryTime: '16/04/2021 16:30:00',
      orderTotalAmount: numbro(267000).format({thousandSeparated: true})
    },
    {
      orderCode: '172155',
      orderBrandCode: 'TPC',
      orderShopName: 'TPC Pegasus',
      orderChannel: 'Online',
      orderPaymentMethod: 'Momo',
      orderStatus: 'First Big Order',
      orderPaymentStatus: 'Đã thanh toán',
      orderMethod: 'TA',
      orderCustomerInfo: '0848170086 | Nam',
      orderCreatedAt: '16/04/2021 00:20:20',
      orderDeliveryTime: '16/04/2021 16:30:00',
      orderTotalAmount: numbro(378000).format({thousandSeparated: true})
    },
    {
      orderCode: '172154',
      orderBrandCode: 'TPC',
      orderShopName: 'TPC 515 Lê Văn Sỹ',
      orderChannel: 'Online',
      orderPaymentMethod: 'COD',
      orderStatus: 'Cooking',
      orderPaymentStatus: 'Đang chờ xử lý',
      orderMethod: 'DE',
      orderCustomerInfo: '0833030307 | Nguyễn Minh Ngân',
      orderCreatedAt: '15/04/2021 22:56:36',
      orderDeliveryTime: '16/04/2021 16:30:00',
      orderTotalAmount: numbro(497500).format({thousandSeparated: true})
    },
  ];

  var userLoggedIn = req.session.user ? req.session.user : {};
  var payload = {
    payTitle: 'Orders',
    userLoggedIn: userLoggedIn,
    data: data
  };

  res.status(200).render('orders', payload);
});

module.exports = router;

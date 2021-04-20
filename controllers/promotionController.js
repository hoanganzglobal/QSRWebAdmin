const express = require('express');
const app = express();
const router = express.Router();

router.get('/', (req, res, next) => {
  var data = [
    {
      brandID: 'TPC',
      memoNumber: 'TPC.2021.41',
      memoDateIssue: '14/04/2021',
      memoName: 'TIE UP AEON MALL LONG BIÊN_MEGA SALES 2021',
      memoFromDate: '21/04/2021',
      memoToDate: '03/05/2021',
      memoFile: '',
    },
    {
      brandID: 'CHANG',
      memoNumber: 'CHANG.2021.48',
      memoDateIssue: '15/04/2021',
      memoName:
        'HỢP TÁC TABLE NOW_ƯU ĐÃI ĐẶC BIỆT "GIẢM 50% MỰC ĐẠI DƯƠNG NƯỚNG SỐT THÁI"',
      memoFromDate: '19/04/2021',
      memoToDate: '29/04/2021',
      memoFile: '',
    },
    {
      brandID: 'AKA',
      memoNumber: 'AKA.2021.46',
      memoDateIssue: '12/04/2021',
      memoName: 'E-VOUCHER 150K/500K TRÊN TỔNG HÓA ĐƠN QUA ỨNG DỤNG MOMO',
      memoFromDate: '16/04/2021',
      memoToDate: '31/05/2021',
      memoFile: '',
    },
  ];

  var userLoggedIn = req.session.user ? req.session.user : {};
  var payload = {
    payTitle: 'Memos',
    userLoggedIn: userLoggedIn,
    data: data,
  };

  res.status(200).render('promotions', payload);
});

router.get('/discounts', (req, res, next) => {
  var data = [];

  var userLoggedIn = req.session.user ? req.session.user : {};
  var payload = {
    payTitle: 'Promotion Discounts',
    userLoggedIn: userLoggedIn,
    data: data,
  };

  res.status(200).render('discounts', payload);
});

router.get('/combo', (req, res, next) => {
  var data = [];

  var userLoggedIn = req.session.user ? req.session.user : {};
  var payload = {
    payTitle: 'Promotion Combo',
    userLoggedIn: userLoggedIn,
    data: data,
    apiUrl: process.env.BACKEND_API_URL
  };

  res.status(200).render('combo', payload);
});

module.exports = router;

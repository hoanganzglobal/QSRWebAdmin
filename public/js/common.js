var SOCKET_URL = 'http://localhost:3003';

function numberWithCommas(x) {
    return x.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
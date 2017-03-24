var mysql = require('mysql');

module.exports = {
  cx: () => {
    return mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      database : 'hockey'
    });
  }
}

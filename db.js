 
var mariadb = require('mariadb');
const mysql = require('mysql');
// Create a connection pool


var conStr=process.env.DB_DO_CONNECTION_STRING;
console.log(conStr);
// var pool = 
//   mariadb.createPool(conStr);
 
// Expose a method to establish connection with MariaDB SkySQL

const connection=mysql.createConnection(conStr);

module.exports = Object.freeze({
  pool: connection
});
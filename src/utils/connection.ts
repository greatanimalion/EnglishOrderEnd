const mysql = require('mysql');
const mysqlConfig = require('./config');
const connection = mysql.createConnection(mysqlConfig);
connection.connect();
export  function getConnection() {
    return connection;
}


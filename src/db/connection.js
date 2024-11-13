"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repool = exports.pool = void 0;
var mysql_1 = require("mysql");
var mysqlConfig = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'english',
    port: 3306
};
// const connection = mysql.createConnection(mysqlConfig);
// connection.connect();
// export function getConnection() {
//     return connection;
// }
var pool = mysql_1.default.createPool(mysqlConfig);
exports.pool = pool;
var repool = function () {
    pool.on('connection', function (stream) {
        console.log('connection established');
    });
};
exports.repool = repool;

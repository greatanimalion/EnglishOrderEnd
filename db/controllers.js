const mysql = require('mysql');
const mysqlConfig = require('./config');
const connection = mysql.createConnection(mysqlConfig);
connection.connect();

function query(sql = 'SELECT * FROM student') {
    return new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return reject(err)
            }
            resolve(result)
        });
    });
}

function insertBaseStudent(account, password) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO student(account,password) VALUES(?,?)';
        const params = [account, password];
        connection.query(sql, params, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return reject(err)
            }
            resolve(result)
        });
    });
}

function findStudentByAccount(account) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM student WHERE account = ?';
        const params = [account];
        connection.query(sql, params, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return reject(err)
            }
            resolve(result)
        });
    });
}


// // //改 update
// const userModSql = 'UPDATE student SET name = ?,sex = ? ,age= ? where id= ?';
// const userModSql_Params = ["王五", "女", "22", "3"];
// connection.query(userModSql, userModSql_Params, function (err, result) {
//     if (err) {
//         console.log('[UPDATE ERROR] - ', err.message);
//         return;
//     }
//     console.log('----------UPDATE-------------');
//     console.log('UPDATE affectedRows', result.affectedRows);
//     console.log('******************************');
// });

// //删 delete
// const userDelSql = 'DELETE FROM student WHERE id = 3';
// connection.query(userDelSql, function (err, result) {
//     if (err) {
//         console.log('[DELETE ERROR] - ', err.message);
//         return;
//     }
//     console.log('-------------DELETE--------------');
//     console.log('DELETE affectedRows', result.affectedRows);
//     console.log('---------------------------------');
// });
// // connection.end();


module.exports = { query,insertBaseStudent,findStudentByAccount };
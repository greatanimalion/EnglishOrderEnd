const mysql = require('mysql');
const mysqlConfig = require('./config');
const connection = mysql.createConnection(mysqlConfig);
connection.connect();

async function query(sql='SELECT * FROM student') {
    let res;
     await connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        console.log('---------------SELECT----------------');
        res=result;
        console.log('-------------------------------------');
    });
    return res;
}


// // 增 insert
// const sql = 'INSERT INTO student(name,sex,age) VALUES(?,?,?)';
// const params = ['张四', '男', '21'];
// connection.query(sql, params, function (err, result) {
//     if (err) {
//         console.log('[UPDATE ERROR] - ', err.message);
//         return;
//     }
//     console.log('----------UPDATE-------------');
//     console.log('UPDATE affectedRows', result.affectedRows);
//     console.log('******************************');
// });

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


module.exports ={ query};
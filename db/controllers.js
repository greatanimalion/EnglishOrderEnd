const mysql = require('mysql');
const mysqlConfig = require('./config');
const connection = mysql.createConnection(mysqlConfig);
connection.connect();

//查询所有学生
function query(sql = 'SELECT * FROM student') {
    return new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return reject(err);
            }
            resolve(result);
        });
    });
}

//插入基本信息
async function insertBaseStudent(account, password) {
    let res;
    try {
        res = await new Promise((resolve, reject) => {
            const sql = 'INSERT INTO student(account,password) VALUES(?,?)';
            const params = [account, password];
            connection.query(sql, params, function (err, result) {
                if (err) {
                    console.log('[INSERT ERROR] - ', err.message);
                    return reject(err);
                }
                resolve(result);
            });
        });
    } catch (error) {
        return false;
    }
    return res;
}

//根据账号查询学生
function findStudentByAccount(account) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM student WHERE account = ?';
        const params = [account];
        connection.query(sql, params, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return reject(err);
            }
            resolve(result);
        });
    });
}

//完善信息
function refineInfor(id,name='',school='',major='',sex='',area='',email='') {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE student SET name = ? ,school= ?,major= ?,sex= ?,area= ?,email= ? where id= ?';
        const params = [name,school,major,sex,area,email,id];
        connection.query(sql, params, function (err, result) {
            if (err) {
                console.log('[UPDATE ERROR] - ', err.message);
                return reject(err);
            }
            resolve(result);
        });
    });
}

//删除数据
function deleteStudent(id) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM student WHERE id = ?';
        const params = [id];
        connection.query(sql, params, function (err, result) {
            if (err) {
                console.log('[DELETE ERROR] - ', err.message);
                return reject(err);
            }
            resolve(result);
        });
    });
}

//查询所有人数
function queryCount() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT COUNT(*) as count FROM student';
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return reject(err);
            }
            resolve(result);
        });
    });
}



module.exports = {
    query,
    insertBaseStudent,
    findStudentByAccount,
    refineInfor,
    deleteStudent,
    queryCount
};
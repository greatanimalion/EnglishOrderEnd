import { pool } from '../db/index.js';
/**
 *@param sql - 输入sql语句返回promise
 */
const connectionQuery = (sql) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                resolve(err);
            }
            conn.query(sql, (err, result) => {
                conn.release();
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    });
};
export default connectionQuery;

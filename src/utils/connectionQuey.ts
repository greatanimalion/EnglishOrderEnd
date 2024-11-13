import { MysqlError, PoolConnection } from 'mysql';
import {pool} from '../db/index.js';
const connectionQuery = (sql:string) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err:MysqlError, conn:PoolConnection) => {
      if (err) {
        resolve(err);
      }
      conn.query(sql, (err:any, result:any) => {
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

import { pool } from '../db/connection.ts';//引入数据库配置文件中的数据库实例
const connectionQuery = (sql: string) => { 
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) {
        resolve(err);//错误的回调，返回错误信息
      }
      conn.query(sql, (err: any, result: any) => { //执行查数据库查询
        conn.release();//释放数据连接，以免占用过多的资源导致系统崩溃或者运行缓
        if (err) {
          reject(err);//以免占用过多的资源导致系统崩溃或者运行缓
        }
        resolve(result);//成功的回调，返回从数据库拿到的数据
      });
    });
  });
};
export default connectionQuery;//导出执行sql的方法

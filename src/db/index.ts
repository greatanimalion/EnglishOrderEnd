//数据库连接池配置
import mysql from'mysql';
const mysqlConfig ={
    host:'localhost',
    user:'root',
    password:'123456',
    // database:'english',
    database:'test',
    port:3306,
    connectionLimit:20,//最大连接数
    connectionTimeout:10000//连接超时时间
}
export const pool = mysql.createPool(mysqlConfig);
export const connect = () => {
  pool.on('connection',()=>{
    console.log('A connection is connected!');
  })
};
export const end= () => {
  pool.end();
};

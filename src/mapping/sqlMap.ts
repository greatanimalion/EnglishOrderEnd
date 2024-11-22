/*
mapping文件夹主要用于存放对不同数据表进行操作的sql语句，
因为我们是学习并了解后端，
所以我这里的sql语句全部是自己原生手写的，
加深理解和印象。当然如果你想快速的进行服务端开发，
并不想深入了解这些sql语句，也可以使用ORM框架来代替这一部分。
*/

import userSQL from './userSQL.js';
import opusSQL from './opusSQL.js';
import commentSQL from './commentSQL.js';
const sqlMap = {
  User: {
    ...userSQL
  },
  Opus:{
    ...opusSQL
  },
  Comment:{
    ...commentSQL
  },
  /**
   * 无条件分页查询
   * @param {number} page 查询页数
   * @param {number} limit 查询条数
   * @param {string} table 查询表
   * @returns {string} 返回值为string类型
   */
  pagingQuery: (page: number, limit: number, table: string) => {
    const offset = (page - 1) * limit;
    return `select * from ${table} limit ${limit} offset ${offset}`;
  },
};

export default sqlMap;

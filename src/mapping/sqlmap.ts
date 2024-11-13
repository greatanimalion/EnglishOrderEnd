// mapping/sqlmap.js
/**
  * 分页查询
  * @param {number} page 查询页数
  * @param {number} limit 查询条数
  * @param {string} table 查询表
  * @returns {string} 返回值为string类型
  */
const sqlmap = {
    pagingQuery: (page: number, limit: number, table: string) => {
        const offset = (page - 1) * limit;
        return `select * from ${table} limit ${limit} offset ${offset}`;//这个就是sql语句，这里就不详细去说了，自行了解
    }
}
const { pagingQuery } = sqlmap;//解构sqlmap对象es6语法
export { pagingQuery };//导出分页查询方法

/*
mapping文件夹主要用于存放对不同数据表进行操作的sql语句，
因为我们是学习并了解后端，
所以我这里的sql语句全部是自己原生手写的，
加深理解和印象。当然如果你想快速的进行服务端开发，
并不想深入了解这些sql语句，也可以使用ORM框架来代替这一部分。
*/
const sqlmap = {
    Admin: {
        adminDel: (id) => {
            return `delete from admin where id = ${id}`;
        },
        adminAdd: (data) => {
            return `insert into admin (id,account,password,email,weight) values (${data
                .map((item) => `'${item}'`)
                .join(',')})`;
        },
        adminByAccount: (account) => {
            return `select id,account,password,email,weight from admin where account like '%${account}%'`;
        },
        adminNameQuery: (account) => {
            return `select id,account,password,email,weight from admin where account = '${account}'`;
        },
        adminUpdate: (data) => {
            return `
        update admin set account = '${data.account}',password = '${data.password}',
        email = '${data.email}',weight = ${data.weight} where id = '${data.id}'
      `;
        },
        adminUpdateActive: (data) => {
            return `
      update admin set weight = ${data.weight} where id = '${data.id}'
    `;
        },
    },
    /**
     * 分页查询
     * @param {number} page 查询页数
     * @param {number} limit 查询条数
     * @param {string} table 查询表
     * @returns {string} 返回值为string类型
     */
    pagingQuery: (page, limit, table) => {
        const offset = (page - 1) * limit;
        return `select * from ${table} limit ${limit} offset ${offset}`;
    },
};
export default sqlmap;

/*
mapping文件夹主要用于存放对不同数据表进行操作的sql语句，
因为我们是学习并了解后端，
所以我这里的sql语句全部是自己原生手写的，
加深理解和印象。当然如果你想快速的进行服务端开发，
并不想深入了解这些sql语句，也可以使用ORM框架来代替这一部分。
*/
const sqlmap = {
  Admin: {
    adminDel: (id: number) => {
      return `delete from admin where id = ${id}`;
    },
    adminAdd: (data:any) => {
      return `insert into admin (id,account,password,email,weight) values (${data
        .map((item:any) => `'${item}'`)
        .join(',')})`;
    },
    adminByAccount: (account: string) => {
      return `select id,account,password,email,weight from admin where account like '%${account}%'`;
    },
    adminNameQuery: (account: string) => {
      return `select id,account,password,email,weight from admin where account = '${account}'`;
    },
    adminUpdate: (data:any) => {
      return `
        update admin set account = '${data.account}',password = '${data.password}',
        email = '${data.email}',weight = ${data.weight} where id = '${data.id}'
      `;
    },
    adminUpdateActive: (data:any) => {
      return `
      update admin set weight = ${data.weight} where id = '${data.id}'
    `;
    },
  },
  Opus:{
    opusAll: () => {
      return `select * from opus`;
    },
    opusDel: (id: number) => {
      return `delete from opus where id = ${id}`;
    },
    opusAdd: (data:any) => {
      return `insert into opus (id,title,author,content,create_time,update_time) values (${data
        .map((item:any) => `'${item}'`)
        .join(',')})`;
    },
    opusByTitle: (title: string) => {
      return `select id,title,author,content,create_time,update_time from opus where title like '%${title}%'`;
    },
    opusNameQuery: (title: string) => {
      return `select id,title,author,content,create_time,update_time from opus where title = '${title}'`;
    },
    opusUpdate: (data:any) => {
      return `
        update opus set title = '${data.title}',author = '${data.author}',
        content = '${data.content}',create_time = '${data.create_time}',update_time = '${data.update_time}' where id = '${data.id}'
      `;
    }
  },
  /**
   * 分页查询
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

export default sqlmap;

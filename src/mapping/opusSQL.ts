export default {
    opusAll: () => {
        return `select * from opus`;
    },
    opusDel: (id: number) => {
        return `delete from opus where id = ${id}`;
    },
    getOpusByOpusId: (id: number) => {
        return `select *from opus where id = ${id}`;
    },
    opusAdd: (data: any) => {
        return `insert into opus (id,title,author,content,create_time,update_time) values (${data
            .map((item: any) => `'${item}'`)
            .join(',')})`;
    },
    getOpusByTitle: (title: string) => {
        return `select * from opus where title like '%${title}%'`;
    },
    opusUpdate: (data: any) => {
        return `
          update opus set title = '${data.title}',author = '${data.author}',
          content = '${data.content}',create_time = '${data.create_time}',update_time = '${data.update_time}' where id = '${data.id}'
          `;
    },
    /**
   * 根据用户id分页查询
   * @param {number} userId 用户id
   * @param {number} page 查询页数
   * @param {number} limit 查询条数
   * @returns {string} 返回值为string类型
   */
    pagingByUserIdQuery: (userId:number,page: number, limit: number) => {
        const offset = (page - 1) * limit;
        return `select * from opus where userId = ${userId} limit ${limit} offset ${offset}`;
    }
}
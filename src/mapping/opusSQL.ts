export default {
    opusAll: () => {
        return `select * from opus`;
    },
    opusDel: (id: number) => {
        return `delete from opus where id = ${id}`;
    },
    getOpusById: (id: number) => {
        return `select * from opus where id = ${id}`;
    },
    createOpus: ({title, userId, time, src, intro}:{title: string, userId: number, time: string, src: string,intro: string}) => {
        return `insert into opus (title,userId,time,src,intro) 
        values ('${title}','${userId}','${time}','${src}','${intro}')`;
    },
    getOpusByTitle: (title: string) => {
        return `select * from opus where title like '%${title}%'`;
    },
    updateOpus: ({id, title, time,intro,type}:{id: number, title: string, time: string,intro: string,type: string}) => {
        return `
          update opus set title = '${title}',time = '${time}',intro = '${intro}',type = '${type}' where id =${id}`;
    },
    /**
   * 根据用户id分页查询
   * @param {number} userId 用户id
   * @param {number} page 查询页数
   * @param {number} limit 查询条数
   * @returns {string} 返回值为string类型
   */
    pagingByUserIdQuery: ({userId,page, limit}: {userId: number, page: number, limit: number}) => {
        const offset = (page - 1) * limit;
        return `select * from opus where userId = ${userId} limit ${limit} offset ${offset}`;
    }
}
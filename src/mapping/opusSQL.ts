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
    createOpus: ({ title, userId, time, src, intro }: { title: string, userId: number, time: string, src: string, intro: string }) => {
        return `insert into opus (title,userId,time,src,intro) 
        values ('${title}','${userId}','${time}','${src}','${intro}')`;
    },
    getOpusByTitle: (title: string) => {
        return `select * from opus where title like '%${title}%'`;
    },
    updateOpus: ({ id, title, time, intro, label }: { id: number, title: string, time: string, intro: string, label: string }) => {
        return `update opus 
        set title = '${title}',time = '${time}',intro = '${intro}',label = '${label}' where id =${id}`;
    },
    /**
     * 根据关键词分页查询
     * @param {string} key 关键词
     * @param {number} page 查询页数
     * @param {number} limit 查询条数
    */
    findOpusByKeyDim({ key, page, limit }: { key: string, page: number, limit: number }) {
        return `select * from opus 
        where title like '%${key}%' or intro like '%${key}%'
        limit ${limit} offset ${(page - 1) * limit}
        `;
    },
    findOpusBylabel({ label, page, limit }: { label: string, page: number, limit: number }) {
        return `select * from opus where label = '${label}'
        limit ${limit} offset ${(page - 1) * limit}
        `;
    },
    /**
   * 根据用户id分页查询
   * @param {number} userId 用户id
   * @param {number} page 查询页数
   * @param {number} limit 查询条数
   * @returns {string} 返回值为string类型
   */
    pagingByUserIdQuery: ({ userId, page, limit }: { userId: number, page: number, limit: number }) => {
        const offset = (page - 1) * limit;
        return `select * from opus where userId = ${userId} limit ${limit} offset ${offset}`;
    }
}
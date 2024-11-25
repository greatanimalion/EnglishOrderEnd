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
    createOpus: ({userId,type}:
         {type:number,userId: number}) => {
        return `insert into opus (userId,type,draft) values (${userId},${type},1)`;
    },
    getLatstOpus(userId:number){
        return `select id from opus where userId = ${userId} and draft = 1 order by id desc limit 1`;
    },
    getOpusByTitle: (title: string) => {
        return `select * from opus where title like '%${title}%'`;
    },
    updateOpus: ({ id,userId, title, time, intro, label,content,coverImg}: 
        { id: number,userId: number, title: string, time: string, intro: string, label: number,content:string,coverImg:string }) => {
        return `update opus 
        set title = '${title}',time = '${time}',intro = '${intro}',label = ${label},content='${content}',coverImg='${coverImg}',draft=0 where id =${id} and userId=${userId}`;
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
    },
    //上传图片
    upload({userId,opusId,src}:{userId:number,opusId:number,src:string}){
        return `insert into utils (userId,opusId,src) 
        values(${userId},${opusId},'${src}')`
    },
    delUtils(opusId:number){
        return `delete from utils where opusId=${opusId}`
    },
    //获取一个作品的全部地址以便删除
    getAllUtils({userId,opusId}:{userId:number,opusId:number}){
        return `select * from utils where userId=${userId} and opusId=${opusId}`
    }
}
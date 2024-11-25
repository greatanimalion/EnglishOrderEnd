import sqlMap from "../mapping/sqlMap.js";
import connectionQuery from "../utils/connectionQuey.js";
import saveImg, { deleteImg } from '../utils/saveImg.js';
class OpusService {
    /**
     * 查询用户所以相关视频
    */
    getOpusByUserId(data: { userId: number, page: number, limit: number }) {
        return connectionQuery(sqlMap.Opus.pagingByUserIdQuery(data));
    }
    /**
     * 根据关键词搜索相关视频
    */
    findOpusByKeyDim({ key, page, limit }: { key: string, page: number, limit: number }) {
        return connectionQuery(sqlMap.Opus.findOpusByKeyDim({ key, page, limit }));
    }
    /**
     * 根据笔标签搜索相关视频
    */
    findOpusByType({ label, page, limit }: { label: string, page: number, limit: number }) {
        return connectionQuery(sqlMap.Opus.findOpusBylabel({ label, page, limit }));
    }
    /**
     * 根据id查视频
    */
    getOpusById(opusId: number) {
        return connectionQuery(sqlMap.Opus.getOpusById(opusId));
    }
    // 创建文章
    async createOpus(opus: { type: number,userId:number}) {
        try {
             await connectionQuery(sqlMap.Opus.createOpus(opus));
             return connectionQuery(sqlMap.Opus.getLatstOpus(opus.userId))
        } catch (error) {
            return { error: true }
        }
    }
    // 删除作品
    async opusDelete({ opusId, userId }: {
        opusId: number
        userId: number
    }) {
        try {
            let utils = await connectionQuery(sqlMap.Opus.getAllUtils({ opusId, userId })) as any[]
            await connectionQuery(sqlMap.Opus.delUtils(opusId))//删除数据库资源数据
            utils.map(async (e) => {  
                await deleteImg(e.src)//删除服务器资源图片
            })
            let res = await connectionQuery(sqlMap.Opus.opusDel(opusId));//删除数据库opus数据
            return res;
        } catch (error) {
            console.log(error);
            return { error: true }
        }
    }
    /**
     * 更新作品
    */
    updateOpus(opus: { id: number,userId: number,title: string, time: string, intro: string, label: number, content: string,coverImg:string }) {
        return connectionQuery(sqlMap.Opus.updateOpus(opus));
    }
    async upload(data: { userId: number, opusId: number }, file: any) {
        const src = await saveImg(file)
        try {
            await connectionQuery(sqlMap.Opus.upload({ ...data, src }))
            return src
        } catch (e) {
            console.log(e);
            
            return null
        }
    }
}
export default new OpusService;

import sqlMap from "../mapping/sqlMap.js";
import connectionQuery from "../utils/connectionQuey.js";
import saveImg, { deleteImg } from '../utils/saveImg.js';
class OpusService {
    /**
     * 查询用户所以相关视频
    */
    getOpusByUserId(userId: number) {
        return connectionQuery(sqlMap.Opus.getOpusByOpusUserId(userId));
    }
    /**
     * 根据id查视频
    */
   getOpusById(opusId: number) {
        return connectionQuery(sqlMap.Opus.getOpusById(opusId));
    }
    async createOpus(opus: { title: string, userId: number, time: string, intro: string }, file: any) {
        try {
            let src = await saveImg(file) as string
            return connectionQuery(sqlMap.Opus.createOpus({ ...opus, src }));
        } catch (error) {
            console.log(error)
            return { error: false }
        }
    }
    /**
     * 删除作品
    */
    async opusDelete(id: number) {
        let opus = await this.getOpusById(id) as any
        if(!opus[0])return { error: true }
        let src=opus[0].src;
        if (!src) return { error: true }
        try{
           await deleteImg(src)
        }catch(error){
            return { error: true }
        }
        let res = await connectionQuery(sqlMap.Opus.opusDel(id));
        return res;
    }
}
export default new OpusService;

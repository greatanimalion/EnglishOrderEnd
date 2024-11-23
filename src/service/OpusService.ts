import sqlMap from "../mapping/sqlMap.js";
import connectionQuery from "../utils/connectionQuey.js";
import saveImg, { deleteImg } from '../utils/saveImg.js';
import { opusType } from "../const/opusType.js";
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
    async createOpus(opus: { type: number, title: string, userId: number, time: string, intro: string, label: string }, file: any[]) {
        try {
            if(file.length < 2)return { error: true }
            let coverImg = await saveImg(file.pop()) as string
            let videoSrc = ''
            if (opus.type = opusType.article) {
                file.map(async (item) => {
                    videoSrc += await saveImg(item) + "|"
                })
            } else {
                videoSrc = await saveImg(file[0]) as string
            }
            return connectionQuery(sqlMap.Opus.createOpus({ ...opus, coverImg, videoSrc }));
        } catch (error) {
            return { error: true }
        }
    }
    // 删除作品
    async opusDelete(id: number) {
        let opus = await this.getOpusById(id) as any
        if (!opus[0]) return { error: true }
        let src = opus[0].src;
        let coverImg = opus[0].coverImg;
        if (!src || !coverImg) return { error: true }
        try {
            await deleteImg(coverImg)
            if (opus[0].type == opusType.vedio) {
                await deleteImg(src)
            }else {
                let videoSrc = opus[0].vedioSrc.split("|")
                videoSrc.pop()
                videoSrc.map(async (item: string) => {
                    await deleteImg(item)
                })
            }
        } catch (error) {
            return { error: true }
        }
        let res = await connectionQuery(sqlMap.Opus.opusDel(id));
        return res;
    }
    /**
     * 更新作品
    */
    updateOpus(opus: { id: number, title: string, time: string, intro: string, label: string }) {
        return connectionQuery(sqlMap.Opus.updateOpus(opus));
    }
}
export default new OpusService;

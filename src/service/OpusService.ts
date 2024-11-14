import sqlMap from "../mapping/sqlMap.js";
import connectionQuery from "../utils/connectionQuey.js";
class OpusService {
    /**
     * 精确id查询
    */
    getOpusById(opusId: number) {
        return connectionQuery(sqlMap.Opus.getOpusByOpusUserId(opusId));
    }
    createOpus(opus:{title: string, userId: number, time: string, src: string,intro: string}) {
        return connectionQuery(sqlMap.Opus.createOpus(opus));
    }
    opusDelete(id: number) {
        return connectionQuery(sqlMap.Opus.opusDel(id));
    }
}
export default new OpusService;

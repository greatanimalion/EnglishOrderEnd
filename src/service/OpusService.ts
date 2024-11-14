import sqlMap from "../mapping/sqlMap.js";
import connectionQuery from "../utils/connectionQuey.js";
class OpusService {
    /**
     * 精确id查询
    */
    getOpusById(opusId: number) {
        return connectionQuery(sqlMap.Opus.getOpusByOpusId(opusId));
    }
}
export default new OpusService;
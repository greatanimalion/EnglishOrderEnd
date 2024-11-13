import sqlMap from "../mapping/sqlMap";
import connectionQuery from "../utils/connectionQuey";
class OpusService {
    /**
     * 精确id查询
    */
    getOpusById(opusId: number) {
        return connectionQuery(sqlMap.Opus.getOpusByOpusId(opusId));
    }
}
export default new OpusService;

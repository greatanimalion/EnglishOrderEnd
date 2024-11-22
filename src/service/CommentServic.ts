import sql from '../mapping/sqlMap';
import connectionQuery from '../utils/connectionQuey';
class CommonService {
    createComment(data: {userId: number, content: string, targetUserId?: number,opusId: number,time:string,parentId:number}) {
        if(!!data.targetUserId){
            return connectionQuery(sql.Comment.createCommenWithTarget(data  as any));
        }
        else return connectionQuery(sql.Comment.createComment(data));
    }
    commentDel(id: number){
        return connectionQuery(sql.Comment.commentDel(id));
    }
    findSubComments(data: {userId: number,opusId: number,parentId:number,page:number,limit:number}){
        return connectionQuery(sql.Comment.findSubComments(data));
    }
    //得到视频一级评论
    findTopComments(data: {userId: number,opusId: number,page:number,limit:number}){
        return connectionQuery(sql.Comment.findTopComments(data));
    }
    //获取视频评论数量
    getCommentCount(opusId: number){
        return connectionQuery(sql.Comment.getCommentCount(opusId));
    }
    //点赞评论
    async favoriteComment(data: {userId: number, commentId: number,opusId: number}){
        await connectionQuery(`update comment set favorite=favorite+1 where id=${data.opusId};`)
        return connectionQuery(`insert into uservocommnet (userId,commentId,opusId) values (${data.userId},${data.commentId},${data.opusId})`);
    }
    //取消点赞评论
    async cancelFavoriteComment(data: {userId: number, commentId: number,opusId: number}){
        await connectionQuery(`update comment set favorite=favorite-1 where id=${data.opusId};`)
        return connectionQuery(`delete from uservocommnet where userId=${data.userId} and commentId=${data.commentId} and opusId=${data.opusId}`);
    }
}
export default new CommonService;
export default{
    createCommenWithTarget:({userId,opusId,targetUserId,content,time,parentId}:
        {userId:number,opusId:number,targetUserId:number,content:string,time:string,parentId:number})=>{
        return `insert into comment (userId,opusId,targetUserId,content,time,parentId) values
         (${userId},${opusId},${targetUserId},'${content}','${time}',${parentId})`;
    },
    createComment({userId,opusId,content,time}:{userId:number,opusId:number,content:string,time:string}){
            return `insert into comment (userId,opusId,content,time) 
            values (${userId},${opusId},'${content}','${time}')`;
    },
    commentDel(id:number){
        return `delete from comment where id = ${id}`;
    },
    findTopComments({userId,page,limit,opusId}:{userId:number,opusId:number,page:number,limit:number}){
        return `
        		SELECT
                DISTINCT
                	c.id AS id,
                	c.userId AS userId,
                	c.time AS time,
                	c.content AS content,
                	c.favorite,
                CASE
	            	WHEN EXISTS (
	            	SELECT lc.userId,lc.opusId FROM
	            		COMMENT lc LEFT JOIN uservocomment lu ON lu.commentId = lc.id 
	            WHERE
	            	lu.userId = ${userId} and c.id=lu.commentId
	            	) THEN 1 ELSE 0 
	            	END AS isFavor 
                FROM
	            	COMMENT c
	            WHERE c.opusId=${opusId}
                	LIMIT ${(page-1)*limit},${limit}
              `
    },
    findSubComments({page,limit,opusId,parentId,userId}:{userId:number,opusId:number,parentId:number,page:number,limit:number}){
        return`
        		SELECT
                DISTINCT
                	c.id AS id,
                	c.userId AS userId,
                	c.time AS time,
                	c.content AS content,
                	c.favorite,
                    c.targetUserId, 
                CASE
	            	WHEN EXISTS (
	            	SELECT lc.userId,lc.opusId FROM
	            	COMMENT lc LEFT JOIN uservocomment lu ON lu.commentId = lc.id 
	            WHERE
	            	lu.userId = ${userId} and c.id=lu.commentId
	            	) THEN 1 ELSE 0 
	            	END AS isFavor 
                FROM
	            	COMMENT c
	            WHERE c.opusId=${opusId} and c.parentId=${parentId}
                	LIMIT ${(page-1)*limit},${limit}
              `
    },
    getCommentCount(opusId:number){
        return `select count(*) as count from comment where opusId = ${opusId}`;
    }
}
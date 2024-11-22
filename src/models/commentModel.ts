export type Comment = {
    id: number,//评论id
    userId: number,//评论者id
    opusId: number,//所属作品id
    content: string,//评论内容
    time:string,//评论时间
    targetUserId: number,//评论目标id
    parentId: number,//父级id
    favorite: number,//点赞数
}
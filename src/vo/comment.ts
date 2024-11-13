export type Comment = {
    id: number,//评论id
    userId: number,//评论者id
    opusId: number,//所属作品id
    content: string,//评论内容
    time:string,//评论时间
    level: number,//评论层级
    parentId: number,//父级id
}
export type Opus = {
    id: number,//id
    userId:number,//用户id
    time: string,///时间
    title:string,//标题
    content: string,//介绍
    intro: string,//介绍
    lable:number,//标签
    coverImg:string,//封面图
    type:string//0文章or1视频
    draft:number//是否草稿 0否 1是
}
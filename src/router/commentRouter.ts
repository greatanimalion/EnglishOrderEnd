import express from 'express';
import CommentController from '../controller/CommentController';
const router = express.Router(); 
//创建评论
router.post('/createComment',CommentController.createComment);
//获取评论
router.get('/getComment',CommentController.findTopComments);
//获取某个评论的子评论
router.get('/getChildComment',CommentController.findSubComments);
//删除评论
router.delete('/deleteComment',CommentController.commentDel);
//获取opus的评论数量
router.get('/getCommentCount',CommentController.getCommentCount);
//点赞评论
router.post('/favoriteComment',CommentController.favoriteComment);
//取消点赞评论
router.post('/cancelFavoriteComment',CommentController.cancelFavoriteComment);
export default router;
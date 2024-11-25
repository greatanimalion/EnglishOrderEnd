import type { Request, Response } from "express";
import response from "../utils/response.js";
import CommentServic from "../service/CommentServic.js";

class CommentController {
  createComment(req: Request, res: Response) {
    const { userId, opusId, targetUserId, content, time, parentId } = req.body;
    if (!userId || !opusId || !content || !time) {
      res.json(response.error(0));
      return
    }
    CommentServic.createComment({ userId, opusId, targetUserId, content, time, parentId }).then(() => {
      res.json(response.success("评论成功"));
    }).catch(() => {
      res.json(response.error(5));
    })

  }
  commentDel(req: Request, res: Response) {
    const { commentId } = req.body;
    if (!commentId) {
      res.json(response.error(0));
      return
    }
    CommentServic.commentDel(commentId).then(() => {
      res.json(response.success("删除成功"));
    }).catch(() => {
      res.json(response.error(5));
    })

  }
  findSubComments(req: Request, res: Response){
    const { parentId,userId,opusId,page,limit } = req.body;
    if (!parentId ||!userId ||!opusId ||!page ||!limit) {
      res.json(response.error(0));
      return
    }
    CommentServic.findSubComments({userId,opusId,parentId,page,limit}).then((data:any) => {
      res.json(response.success(data));
    }).catch(() => {
      res.json(response.error(5));
    })
  }
  findTopComments(req: Request, res: Response){
      const { userId,opusId,page,limit } = req.body;
      if (!userId ||!opusId ||!page ||!limit) {
        res.json(response.error(0));
        return
      }
      CommentServic.findTopComments({userId,opusId,page,limit}).then((data:any) => {
        res.json(response.success(data));
      }).catch(() => {
        res.json(response.error(5));
      })
  }
  getCommentCount(req: Request, res: Response){
      const { opusId } = req.params;
      if (!opusId) {
        res.json(response.error(0));
        return
      }
      CommentServic.getCommentCount(Number(opusId)).then((data:any) => {
        res.json(response.success(data));
      }).catch(() => {
        res.json(response.error(5));
      })
  }
  favoriteComment(req: Request, res: Response){
      const { commentId, userId,opusId } = req.body;
      if (!commentId ||!userId||!opusId) {
        res.json(response.error(0));
        return
      }
      CommentServic.favoriteComment({commentId,userId,opusId}).then(() => {
        res.json(response.success("点赞成功"));
      }).catch(() => {
        res.json(response.error(5));
      })
  }
  cancelFavoriteComment(req: Request, res: Response){
      const { commentId, userId,opusId } = req.body;
      if (!commentId ||!userId||!opusId) {
        res.json(response.error(0));
        return
      }
      CommentServic.cancelFavoriteComment({commentId,userId,opusId}).then(() => {
        res.json(response.success("点赞取消成功"));
      }).catch(() => {
        res.json(response.error(5));
      })
  }
}

export default new CommentController(); 
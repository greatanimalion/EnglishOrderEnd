import type{ Request, Response } from "express";
import response from "../utils/response";

class CommentController {
   createComment(req: Request, res: Response){
    try {
      const { userId,opusId,targetUserId,content,time,parentId } = req.body;
      
      res.status(201).json({ message: "Comment created successfully" });
    } catch (error) {
      res.status(500).json(response.error(1));
    }
  }
}

export default new CommentController(); 
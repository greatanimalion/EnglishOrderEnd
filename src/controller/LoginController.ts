import type { Request, Response } from "express";
import response from "../utils/response.js";
import UserService from "../service/UserService.js";
class LoginController {
    /**
     *登录 
    */
   login(req: Request, res: Response) {
       const {email, password} = req.body;
       if(!email ||!password){
          res.json(response.error(0))
          return
       }
   }
   /**
    * 发送验证码
   */
   sendCode(req: Request, res: Response) {
     const {email, password} = req.body;
     if(!email ||!password){
        res.json(response.error(0))
        return 
     }
     res.json(response.success("1293","验证码发送成功",200))
   }
   /**
    * 验证验证码   
   */
   verifyCode(req: Request, res: Response) {
       const { code} = req.body;
       if(!code){
          res.json(response.error(0))
          return
       }
       res.json(response.success("","验证码验证成功",200))
   }
   /**
    * 注册
   */
   register(req: Request, res: Response) {
        const {email, password} = req.body;
        if(!email ||!password){
           res.json(response.error(0))
           return 
        }
      UserService.addUser({email, password}).then(() => {
          res.json(response.success("","注册成功",200))
      }).catch(() => {
          res.json(response.error(5))
      })
   }
}
export default new LoginController();
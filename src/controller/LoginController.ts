import type { Request, Response } from "express";
class LoginController {
    /**
     *登录 
    */
   login(req: Request, res: Response) {
       console.log("LoginController.login() called");
   }
   /**
    * 发送验证码
   */
   sendCode(req: Request, res: Response) {
        console.log("LoginController.sendCode() called");
   }
   /**
    * 验证验证码   
   */
   verifyCode(req: Request, res: Response) {
        console.log("LoginController.verifyCode() called");
   }
   /**
    * 注册
   */
   register(req: Request, res: Response) {
        console.log("LoginController.register() called");
   }
}
export default new LoginController();
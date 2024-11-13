class LoginController {
    /**
     *登录
    */
    login(req, res) {
        console.log("LoginController.login() called");
    }
    /**
     * 发送验证码
    */
    sendCode(req, res) {
        console.log("LoginController.sendCode() called");
    }
    /**
     * 验证验证码
    */
    verifyCode(req, res) {
        console.log("LoginController.verifyCode() called");
    }
    /**
     * 注册
    */
    register(req, res) {
        console.log("LoginController.register() called");
    }
}
export default new LoginController();

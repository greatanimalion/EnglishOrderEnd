import express from 'express';
import userController from '../controller/UserController.js';
import LoginController from '../controller/LoginController.js';
const router = express.Router(); 
//分页查询用户
router.post('/queryUserList', userController.getUserList);
//新增用户
router.post('/addUser', userController.addUser);
//删除指定用户
router.delete('/deleteUser', userController.deleteUser);
//模糊查询用户
router.post('/findUserByNameDim', userController.findUserByUserNameDim);
//修改用户信息
router.put('/updateUser', userController.updateUser);
//根据email查询用户信息
router.get('/:email', userController.getUserByEmail)
//根据id查询用户信息
router.get('/:id', userController.getUserById)
//更新密码
router.put('/updatePwd', userController.updatePwd)
//登录
router.post('/login', LoginController.login)
//退出登录
router.post('/logout', ()=>{})
//注册
router.post('/register', LoginController.register)
//获取验证码
router.post('/getVerifyCode', LoginController.sendCode)

export default router;
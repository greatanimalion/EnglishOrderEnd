import express from 'express';
import userController from '../controller/UserController.js';
const router = express.Router(); 
//分页查询用户数据
router.post('/queryUserList', userController.getUserList);
//新增用户数据
router.post('/addUser', userController.addUser);
//删除指定用户数据
router.delete('/deleteUser', userController.deleteUser);
//模糊查询用户数据
router.post('/findUserByNameDim', userController.findUserByUserNameDim);
//修改用户信息
router.put('/updateUser', userController.updateUser);
export default router;
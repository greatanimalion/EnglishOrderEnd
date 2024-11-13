/*
router文件夹主要存放了路由的配置，
和不同URL请求的处理程序或控制器，
将http请求方法与url路径映射到控制器操作。
*/
import userController from '../controller/UserController.js';
import express from 'express';
const router = express.Router(); //创建路由对象
//分页查询用户数据
router.post('/user/queryUserList', userController.getUserList);
//新增用户数据
router.post('/user/addUser', userController.addUser);
//删除指定用户数据
router.delete('/user/deleteUser', userController.deleteUser);
//模糊查询用户数据
router.get('/user/getUserDim', userController.getUserDim);
//修改用户信息
router.put('/user/updateUser', userController.updateUser);

export default router; 


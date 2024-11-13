/*
router文件夹主要存放了路由的配置，
和不同URL请求的处理程序或控制器，
将http请求方法与url路径映射到控制器操作。
*/
import AdminController from '../controller/AdminController.js';
import express from 'express';
const router = express.Router(); //创建路由对象
//分页查询后台管理员数据
router.post('/admin/queryAdminList', AdminController.getAdminList);
//新增管理员数据
router.post('/admin/addAdmin', AdminController.addAdmin);
//删除指定管理员数据
router.delete('/admin/deleteAdmin', AdminController.deleteAdmin);
//模糊查询管理员数据
router.get('/admin/getAdminDim', AdminController.getAdminDim);
//修改管理员信息
router.put('/admin/updateAdmin', AdminController.updateAdmin);
export default router;

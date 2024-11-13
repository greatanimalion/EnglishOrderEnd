import router from './index.js'
import userController from '../controller/UserController.js';
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
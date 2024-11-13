/*
controller文件夹主要用于存放处理请求和响应的代码，
这也是对代码的一种解耦，这里只处理请求和响应的值，
不做业务的处理和数据的操作，
当然它也可以直接处理请求并返回响应数据但是我们不建议这样去做。
*/
import UserService from '../service/UserService.js';
import response from '../utils/response.js';
import type {Request, Response} from 'express'
class UserController {
  /**
   * 获得管理员列表分页数据
   * @param {Context} ctx
   */
  getUserList(req:Request, res:Response) {
    const { limit, page } = req.body;
    UserService.getUserListPage({ limit, page })
      .then((result:any) => {
        res.json(response.success(result,undefined, 200));
      })
      .catch((err:any) => {
        res.json(response.error(err.code, undefined, err.errno));
      });
  }

  /**
   * 新增数据
   * @param {Context} ctx
   */
  async addUser(req:Request, res:Response) {
    const { body: {email,password} } = req;
    if(!email ||!password)res.json(response.error('参数错误', undefined, 404));
    const isUser = await UserService.getUserByEmail(email) as any;
    if (isUser.length) {
      res.json(
        response.error(`新增用户${isUser[0].email}已存在！`, undefined, 200)
      );
      return;
    }
    UserService.addUserInfo({ email, password })
      .then(() => {
        res.json(response.success("创建成功",undefined, 200));
      })
      .catch((err:any) => {
        res.json(response.error(err.code, undefined, err.errno));
      });
  }

  /**
   * 更新数据
   * @param {Context} ctx
   */
  updateUser(req:Request, res:Response) {
    const { body: User } = req;
    UserService.updateUser(User)
      .then((result:any) => {
        res.json(response.success('更新成功',undefined, 200));
      })
      .catch((err:any) => {
        res.json(response.error(err.code, undefined, err.errno));
      });
  }

  /**
   * 删除数据
   * @param {Context} ctx
   */
  deleteUser(req:Request, res:Response) {
    const { id } = req.body;
    UserService.delUser(id)
      .then(() => {
        res.json(response.success('删除成功',undefined, 200));
      })
      .catch((err:any) => {
        res.json(response.error(err.code, undefined, err.errno));
      });
  }

  /**
   * 模糊查询管理员信息
   * @param ctx 上下文
   */
  getUserDim(req:Request, res:Response) {
    const { account } = req.query;
    UserService.getUserByEmail(account as string)
      .then((result:any) => {
        res.json(response.success(result,undefined,200));
      })
      .catch((err:any) => {
        res.json(response.error(err.code, undefined, err.errno));
      });
  }

  /**
   * 修改管理员登录权限
   * @param ctx 上下文
   */
  editUserInfo(req:Request, res:Response) {
    const { body } = req;
    UserService.editUserInfo(body)
      .then((result:any) => {
        res.json(response.success('修改成功',undefined, 200));
      })
      .catch((err:any) => {
        res.json(response.error(err.code, undefined, err.errno));
      });
  }
}
export default new UserController();

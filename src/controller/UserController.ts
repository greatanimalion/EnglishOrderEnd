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
        res.json(response.success(result, 'success', 200));
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
    const { body: User } = req;
    const isUser = await UserService.getUserByName(User.account) as any;
    if (isUser.length) {
      res.json(
        response.error(`新增用户${isUser[0].account}已存在！`, undefined, 200)
      );
      return;
    }
    UserService.addUserInfo([
      Math.floor(Math.random() * 10000 - 1),
      User.account,
      User.password,
      User.email,
      User.weight,
    ])
      .then(() => {
        res.json(response.success(undefined, 'success', 200));
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
        res.json(response.success(undefined, 'success', 200));
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
        res.json(response.success(undefined, 'success', 200));
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
    UserService.getUserByAccount(account as string)
      .then((result:any) => {
        res.json(response.success(result, 'success', 200));
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
        res.json(response.success(undefined, 'success', 200));
      })
      .catch((err:any) => {
        res.json(response.error(err.code, undefined, err.errno));
      });
  }
}
export default new UserController();

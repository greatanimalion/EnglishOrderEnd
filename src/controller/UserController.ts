/*
controller文件夹主要用于存放处理请求和响应的代码，
这也是对代码的一种解耦，这里只处理请求和响应的值，
不做业务的处理和数据的操作，
当然它也可以直接处理请求并返回响应数据但是我们不建议这样去做。
*/
import UserService from '../service/UserService.js';
import response from '../utils/response.js';
import type { Request, Response } from 'express'
class UserController {
  /**
   * 获得管理员列表分页数据
   * @param {Context} ctx
   */
  getUserList(req: Request, res: Response) {
    const { limit, page } = req.body;
    if (!limit || !page) {
      res.json(response.error('参数错误', 'error', 400))
      return
    }
    UserService.getUserListPage({ limit, page })
      .then((result: any) => {
        res.json(response.success(result, undefined, 200));
      })
      .catch((err: any) => {
        res.json(response.error(err.code, undefined, err.errno));
      });
  }
  /**
   * 新增用户
   * @param {Context} ctx
   */
  async addUser(req: Request, res: Response) {
    const { body: { email, password } } = req;
    if (!email || !password) {
      res.json(response.error('参数错误', undefined, 404));
      return
    }
    const isUser = await UserService.getUserByEmail(email) as any;
    if (isUser.length) {
      res.json(
        response.error(`新增用户${isUser[0].email}已存在！`, "error", 200)
      );
      return;
    }
    UserService.addUser({ email, password })
      .then(() => {
        res.json(response.success("创建成功", undefined, 200));
      })
      .catch((err: any) => {
        res.json(response.error(err.code, undefined, err.errno));
      });
  }

  /**
   * 更新数据
   * @param {Context} ctx
   */
  updateUser(req: Request, res: Response) {
    const { id, name = "", intro = "", area = "", sex =0 } = req.body;
    if (!id) {
      res.json(response.error('参数错误', undefined, 400));
      return;
    }
    UserService.updateUserInfo({ id, name, intro, area, sex })
      .then(() => {
        res.json(response.success('更新成功', undefined, 200));
      })
      .catch((e) => {
        console.log(e);
        
        res.json(response.error("修改失败", undefined,400));
      });
  }

  /**
   * 删除用户
   * @param {Context} ctx
   */
  deleteUser(req: Request, res: Response) {
    const { id } = req.body;
    if (!id) {
      res.json(response.error('参数错误', undefined, 400));
      return;
    }
    UserService.delUser(id)
      .then(() => {
        res.json(response.success('删除成功', undefined, 200));
      })
      .catch((err: any) => {
        res.json(response.error(err.code, undefined, err.errno));
      });
  }

  /**
   * 获取用户信息
   */
  getUserByEmail(req: Request, res: Response) {
    const { account } = req.query;
    UserService.getUserByEmail(account as string)
      .then((result: any) => {
        res.json(response.success(result, undefined, 200));
      })
      .catch((err: any) => {
        res.json(response.error(err.code, undefined, err.errno));
      });
  }

  /**
   * 根据用户名模糊查找用户
   * @param ctx 上下文
   */
  findUserByUserNameDim(req: Request, res: Response) {
    const { name,page,limit } = req.body;
    if(!name || !page || !limit){
      res.json(response.error('参数错误', undefined, 400));
      return
    }
    UserService.getUserByNameDimQuery({ name,page,limit })
      .then((result: any) => {
        res.json(response.success(result,'success', 200));
      })
      .catch((err: any) => {
        res.json(response.error("查找失败", undefined, 400));
      });
  }
}
export default new UserController();

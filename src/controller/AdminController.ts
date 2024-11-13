/*
controller文件夹主要用于存放处理请求和响应的代码，
这也是对代码的一种解耦，这里只处理请求和响应的值，
不做业务的处理和数据的操作，
当然它也可以直接处理请求并返回响应数据但是我们不建议这样去做。
*/
import AdminService from '../service/AdminService.js';
import response from '../utils/response.js';
import type {Request, Response} from 'express'
class AdminController {
  /**
   * 获得管理员列表分页数据
   * @param {Context} ctx
   */
  getAdminList(req:Request, res:Response) {
    const { limit, page } = req.body;
    AdminService.getAdminListPage({ limit, page })
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
  async addAdmin(req:Request, res:Response) {
    const { body: admin } = req;
    const isAdmin = await AdminService.getAdminByName(admin.account) as any;
    if (isAdmin.length) {
      res.json(
        response.error(`新增用户${isAdmin[0].account}已存在！`, undefined, 200)
      );
      return;
    }
    AdminService.addAdminInfo([
      Math.floor(Math.random() * 10000 - 1),
      admin.account,
      admin.password,
      admin.email,
      admin.weight,
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
  updateAdmin(req:Request, res:Response) {
    const { body: admin } = req;
    AdminService.updateAdmin(admin)
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
  deleteAdmin(req:Request, res:Response) {
    const { id } = req.body;
    AdminService.delAdmin(id)
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
  getAdminDim(req:Request, res:Response) {
    const { account } = req.query;
    AdminService.getAdminByAccount(account as string)
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
  editAdminInfo(req:Request, res:Response) {
    const { body } = req;
    AdminService.editAdminInfo(body)
      .then((result:any) => {
        res.json(response.success(undefined, 'success', 200));
      })
      .catch((err:any) => {
        res.json(response.error(err.code, undefined, err.errno));
      });
  }
}
export default new AdminController();

import UserService from '../service/UserService.js';
import response from '../utils/response.js';
import type { Request, Response } from 'express'
class UserController {
  /**
   * 获得管理员列表分页数据
   */
  getUserList(req: Request, res: Response) {
    const { limit, page } = req.body;
    if (!limit || !page) {
      res.json(response.error(0))
      return
    }
    UserService.getUserListPage({ limit, page })
      .then((result: any) => {
        res.json(response.success(result, undefined, 200));
      })
      .catch((err: any) => {
        res.json(response.error(5));
      });
  }
  /**
   * 新增用户
   */
  async addUser(req: Request, res: Response) {
    const { body: { email, password } } = req;
    if (!email || !password) {
      res.json(response.error(0));
      return
    }
    const isUser = await UserService.getUserByEmail(email) as any;
    if (isUser.length) {
      res.json({data:`新增用户${isUser[0].email}已存在！`, msg:"error", code:400});
      return;
    }
    UserService.addUser({ email, password })
      .then(() => {
        res.json(response.success("创建成功", undefined, 200));
      })
      .catch(() => {
        res.json(response.error(5));
      });
  }
  /**
   * 更新数据
   */
  updateUser(req: Request, res: Response) {
    const { id, name = "", intro = "", area = "", sex =0 } = req.body;
    if (!id) {
      res.json(response.error(0));
      return;
    }
    UserService.updateUserInfo({ id, name, intro, area, sex })
      .then(() => {
        res.json(response.success('更新成功', undefined, 200));
      })
      .catch((e) => {
        console.log(e);
        
        res.json(response.error(5));
      });
  }

  /**
   */
  deleteUser(req: Request, res: Response) {
    const { id } = req.body;
    if (!id) {
      res.json(response.error(0));
      return;
    }
    UserService.delUser(id)
      .then(() => {
        res.json(response.success('删除成功', undefined, 200));
      })
      .catch(() => {
        res.json(response.error(5));
      });
  }

  /**
   * 根据email获取用户信息
   */
  getUserByEmail(req: Request, res: Response) {
    const { emial } = req.query;
    if(!emial){
      res.json(response.error(0));
      return 
    }
    UserService.getUserByEmail(emial as string)
      .then((result: any) => {
        res.json(response.success(result, undefined, 200));
      })
      .catch(() => {
        res.json(response.error(5));
      });
  }
  /**
   * 根据id获取用户信息
   */
  getUserById(req: Request, res: Response) {
    const { id } = req.query;
    if(!id){
      res.json(response.error(0));
      return
    }
    UserService.getUserById(Number(id))
      .then((result: any) => {
        res.json(response.success(result, undefined, 200));
      })
      .catch((err: any) => {
        res.json(response.error(5));
      });
  } 
  /**
   * 根据用户名模糊查找用户
   * @param ctx 上下文
   */
  findUserByUserNameDim(req: Request, res: Response) {
    const { name,page,limit } = req.body;
    if(!name || !page || !limit){
      res.json(response.error(0));
      return
    }
    UserService.getUserByNameDimQuery({ name,page,limit })
      .then((result: any) => {
        res.json(response.success(result,'success', 200));
      })
      .catch((err: any) => {
        res.json(response.error(5));
      });
  }
  updatePwd(req: Request, res: Response){
    const { id, oldPassword, newPassword } = req.body;
    if(!id || !oldPassword || !newPassword){
      res.json(response.error(0));
      return
    }
    UserService.updatePwd({ id, oldPassword, newPassword })
      .then(() => {
        res.json(response.success("修改成功", undefined, 200));
      })  
      .catch((err: any) => {
        res.json(response.error(5));
      })
  }
}
export default new UserController();

/*
service文件夹负责处理业务逻辑和数据操作，
它位于控制器（Controller）和数据库之间，
主要负责处理业务逻辑、调用数据访问层（DAO）进行数据操作，
并将处理结果返回给控制器或其他上层模块。
*/
import sqlMap from "../mapping/sqlMap.js";
import { AddUser } from "../models/userModel.js";
import connectionQuery from'../utils/connectionQuey.js';
const { User, pagingQuery } = sqlMap;
class UserService {
  /**
   * 分页查询管理员数据
   * @param page 页数
   * @param limit 条数
   * @returns
   */
  getUserListPage(data:{page:number,limit:number}) {
    return connectionQuery(
      pagingQuery(Number(data.page), Number(data.limit), 'user')
    );
  }

  //根据传入账号查询指定数据
  getUserByName(account:string) {
    return connectionQuery(User.getUserByEmailQuery(account));
  }

  //新增用户员数据
  addUserInfo(user:AddUser) {
    return connectionQuery(User.userAdd(user));
  }

  //删除指定用户员数据
  delUser(id:number) {
    return connectionQuery(User.userDel(id));
  }
  /**
   * 根据传入的查询条件查询数据
   * @param {string} account 传入查询条件
   * @returns
   */
  getUserByEmail(account:string) {
    return connectionQuery(User.getUserByEmailQuery(account));
  }

  /**
   * 更新指定管理员信息
   * @param id 管理员id
   * @param data 管理员更新数据集合
   * @returns
   */
  updateUser(data:any) {
    return connectionQuery(User.userUpdate(data));
  }

  /**
   * 修改管理员权限
   * @param id 管理员id
   * @param data 修改数据
   * @returns
   */
  editUserInfo(data:any) {
    return connectionQuery(User.userUpdateActive(data));
  }
}
export default new UserService();

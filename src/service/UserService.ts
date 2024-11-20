/*
service文件夹负责处理业务逻辑和数据操作，
它位于控制器（Controller）和数据库之间，
主要负责处理业务逻辑、调用数据访问层（DAO）进行数据操作，
并将处理结果返回给控制器或其他上层模块。
*/
import sqlMap from "../mapping/sqlMap.js";
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

  //模糊查询名字 分页查询
  getUserByNameDimQuery(data:{name:string,page:number,limit:number}) {
    return connectionQuery(User.getUserByNameDimQuery(data));
  }

  //新增用户员数据
  addUser(user:{email:string,password:string}) {
    return connectionQuery(User.userAdd(user));
  }
  //删除指定用户员数据
  delUser(id:number) {
    return connectionQuery(User.userDel(id));
  }
  /**
   * 根据id查询
   */
  getUserByEmail(account:string) {
    return connectionQuery(User.getUserByEmailQuery(account));
  }

  /**
   * 修改管理员权限
   * @param id 管理员id
   * @param data 修改数据
   * @returns
   */
  updateUserInfo(data:{ id: number; name: string; intro: string; area: string; sex: number; }) {
    return connectionQuery(User.userUpdate(data));
  }
}
export default new UserService();

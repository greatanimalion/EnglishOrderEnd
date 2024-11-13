// controller/AdminController.js 
//可以理解为这个是用于处理管理员用户数据的类，里面包含了对数据进行增删改查的接口方法，这里只展示了查询管理员用户的信息
// import AdminService from '../service/AdminService';//这个是引入我们业务层代码文件，用于把相应接口方法的响应数据处理并返给我们
// class AdminController {//定义一个AdminController类
//   /**
//    * 获得管理员列表分页数据
//    * @param {Context} ctx
//    */
//   getAdminList(req: any, res: any) { 
//     const { limit, page } = req.body;//这里是拿到请求体中的数据，page页数，limit条数
//     AdminService.getAdminListPage({ limit, page }) //这里是调用处理业务层的代码方法，并把我们的请求参数传入进行后续处理
//       .then((result: any) => {
//         res.json(result);//这里是响应成功之后返回处理好的响应数据
//       })
//       .catch((err:any) => {
//         res.json({code:400,msg:'error'});//这里是请求失败返回的数据
//       });
//   }
// }
// export default new AdminController();//实例化这个类并导出

import {AddUser,User} from '../models/userModel.js';
export const userSQL = {
    userDel: (id: number) => {
        return `delete from user where id = ${id}`;
    },
    userAdd: (user: AddUser) => {
        return `insert into user (email,password)
         values (${user.email},${user.password})`;
    },
    getUserByEmailQuery: (emial: string) => {
        return `select email from user where email ='${emial}'`;
    },
    getUserByNameDimQuery: (emial: string) => {
        return `select email from user where account like '%${emial}%'`;
    },
    getUserByNameQuery: (account: string) => {
        return `select id,account,password,email,weight from user where account = '${account}'`;
    },
    userUpdate: (data: User) => {
        return `
        update user set account = '${data}',password = '${data.password}',
        email = '${data.email}',name = ${data.name} where id = '${data.id}'
      `;
    },
    userUpdateActive: (data: {id: number, vip: number}) => {
        return `
      update user set vip = ${data.vip} where id = '${data.id}'
    `;
    },
}
export default userSQL;
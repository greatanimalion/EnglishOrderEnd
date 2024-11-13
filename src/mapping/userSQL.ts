import {AddUser} from '../models/userModel.js';
export const userSQL = {
    userDel: (id: number) => {
        return `delete from user where id = ${id}`;
    },
    userAdd: (user: AddUser) => {
        console.log(user);
        
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
    userUpdate: (data: any) => {
        return `
        update user set account = '${data.account}',password = '${data.password}',
        email = '${data.email}',weight = ${data.weight} where id = '${data.id}'
      `;
    },
    userUpdateActive: (data: any) => {
        return `
      update user set weight = ${data.weight} where id = '${data.id}'
    `;
    },
}
export default userSQL;
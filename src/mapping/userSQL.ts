export const userSQL = {
    userDel: (id: number) => {
        return `delete from user where id = ${id}`;
    },
    userAdd: (user: {email: string, password: string}) => {
        return `insert into user (email,password)
         values (${user.email},${user.password})`;
    },
    getUserByEmailQuery: (emial: string) => {
        return `select email from user 
        where email ='${emial}'`;
    },
    getUserByNameDimQuery: (data: {name: string,page: number,limit: number}) => {
        return `select id,name,intro,area,sex,vip,email from user 
        where name like '%${data.name}%'
        limit ${(data.page - 1) * data.limit},${data.limit}`;
    },
    userUpdate: (data: {id: number, name: string, intro: string, area: string, sex: number}) => {
        return `update user set name = '${data.name}',intro = '${data.intro}',area = '${data.area}',sex = ${data.sex}
        where id = ${Number(data.id)}`;
    },
    userSetVip: (data: {id: number, vip: number}) => {
        return `update user set vip = ${data.vip} 
        where id = ${Number(data.id)}`;
    },
}
export default userSQL;
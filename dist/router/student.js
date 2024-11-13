"use strict";
// import express from 'express';
// import { verifyToken } from '../utils/token.js';
// const router = express.Router();
// router.get('/', (req, res) => {
//   res.send('Welcome to the student page');
// });
// //完善信息
// router.post('/refineInfor', (req:any, res:) => {
//   const { school, major, sex, area, email, name } = req.body;
//   if (!req.session.token) return res.status(401).send('请登录');
//   const tokenKey = verifyToken(req.session.token).tokenKey;
//   const result = sql.refineInfor(tokenKey.id,name, school, major, sex, area, email);
//   if (result) res.status(200).send({ msg: '修改成功', result });
//   else res.status(400).send('修改失败');
// });
// //查找学生
// router.get('/findStudent/:account', async (req, res) => {
//   const account = req.params.account;
//   if (!account) return res.status(400).send('Please provide account');
//   let result = await sql.findStudentByAccount(account);
//   console.log('---------------findStudentByAccount-----------------');
//   console.log(result);
//   console.log('------------');
//   if (result) res.status(200).send(result);
//   else res.status(400).send('error');
// });
// //创建学生
// router.put('/addStudent', async (req, res) => {
//   const { account, password, code } = req.body;
//   if(code!== '123456')return res.status(400).send('验证码错误');
//   if (!account || !password) return res.status(400).send('Please provide account and password');
//   let result = await sql.insertBaseStudent(account, password);
//   if (result) {
//     console.log('---------------INSERT-----------------');
//     result = await sql.findStudentByAccount(account);
//     console.log('------------------------------------');
//     res.status(200).send({ msg: '创建成功', result });
//   }
//   else res.status(400).send('账号重复');
// });
// //所有学生
// router.get('/allStudent', async (req, res) => {
//   let result = await sql.query();
//   console.log('---------------SELECT----------------');
//   console.log(result);
//   console.log('-------------------------------------');
//   if (result) res.status(200).send(result);
//   else res.status(404).send('查找失败');
// });
// export default router;

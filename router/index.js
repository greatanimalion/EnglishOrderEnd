const express = require('express');
const router = express.Router();
const sql = require('../db/controllers.js');
router.get('/test', (req, res) => {
  res.send('Welcome to the router!');
});


router.get('/allStudent',async (req, res) => {
 let result=await sql.query()
 console.log('---------------SELECT----------------');
 console.log(result);
 console.log('-------------------------------------');
 if(result)res.status(200).send(result);
 else res.status(404).send('查找失败');
});
router.post('/addStudent',async (req, res) => {
  const {account,password}=req.body;
  if(!account ||!password)return res.status(400).send('Please provide account and password');
  let result=await sql.insertBaseStudent(account,password);
  console.log('---------------INSERT-----------------');
  console.log(result);
  console.log('------------------------------------');
  if(result)res.status(200).send('创建成功');
  else res.status(404).send('账号重复');
})
router.get('/findStudent/:account',async (req, res) => {
  const account=req.params.account
  if(!account)return res.status(400).send('Please provide account');
  let result=await sql.findStudentByAccount(account);
  console.log('---------------findStudentByAccount-----------------');
  console.log(result);
  console.log('------------');
  if(result)res.status(200).send(result);
  else res.status(404).send('error');
})
module.exports = router;
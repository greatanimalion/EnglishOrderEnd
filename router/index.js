const express = require('express');
const router = express.Router();
const {signToken} = require('../utils/jwt.config.js');
const sql = require('../db/controllers.js');
router.get('/test', (req, res) => {
  res.send('Welcome to the router!');
});



//test
router.get('/getCode',async (req, res) => {
     res.status(200).send('123456');
})



router.post('/login',async (req,res)=>{
  const {account,password}=req.body;
  if(!account ||!password)return res.status(400).send('请输入账号或密码');
  const result=await sql.findStudentByAccount(account);
  if(result&&result[0] && result[0].password===password){
    let token=signToken({id:result[0].id,type:result[0].type});
    req.session.token=token
    const infor={
      id:result[0].id,
      name:result[0].name,
      account:result[0].account,
      school:result[0].school,
      major:result[0].major
    }
    res.status(200).send({msg:'登录成功',result:infor});
  }else{
    res.status(400).send('账号或密码错误');
  }
})
module.exports = router;
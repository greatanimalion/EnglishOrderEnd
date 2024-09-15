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
 else res.status(404).send('error');
});
router.post('/addStudent',async (req, res) => {
  const {account,password}=req.body;
  if(!account ||!password)return res.status(400).send('Please provide account and password');
  let result=await sql.addStudent(account,password);
  console.log('---------------INSERT-----------------');
  console.log(result);
  console.log('------------------------------------');
  if(result)res.status(200).send(result);
  else res.status(404).send('error');
})
module.exports = router;
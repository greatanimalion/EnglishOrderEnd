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
 res.send(result);
});
module.exports = router;
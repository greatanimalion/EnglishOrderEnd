const express = require('express');
const router = express.Router();
const sql = require('../db/controllers.js');
router.get('/test', (req, res) => {
  res.send('Welcome to the router!');
});


router.get('/allStudent', (req, res) => {
 res.send(sql.query())
});
module.exports = router;
const path = require('path');
const rollup = require('../index.js');
//入口文件的绝对路径
let entry = path.resolve(__dirname,'./a.js');
rollup(entry,'./dist/index.js');

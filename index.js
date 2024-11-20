import run from './dist/index.js';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
//读取环境配置文件
// let env=fs.readFileSync(path.resolve(__dirname,'.env'), 'utf-8');
// env.replaceAll('\r', '').split('\n').forEach(line => {
//   const [key, value] = line.split('=');
//   process.env[key] = value;
// });

// console.log(process.env.PORT);

run();

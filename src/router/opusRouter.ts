import OpusController from '../controller/OpusController.js'
import multer from 'multer'
import path from 'path'
import express from 'express';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));


const router = express.Router(); 
//创建multer的实例对象，通过dest属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../../public/videos') })
//'cover_img'为前端存储文件的属性名，必须一致
router.post('/createOpus', upload.single('video'),OpusController.createOpus)
//精确查找opus
router.get('/:id',OpusController.getOpusById)

export default router
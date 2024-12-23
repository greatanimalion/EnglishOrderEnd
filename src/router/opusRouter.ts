import OpusController from '../controller/OpusController.js'
import multer from 'multer'
import path from 'path'
import express from 'express';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router(); 
//创建multer的实例对象，通过dest属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../../public/bin') })

//创建opus
router.post('/createOpus',OpusController.createOpus)
//精确查找opus
router.get('/:id',OpusController.getOpusById)
//删除作品
router.delete('/del',OpusController.deleteOpus)
//更新作品
router.put('/updata',OpusController.updateOpus)
//根据用户id分页查找其所有作品
router.post('/findByUser',OpusController.getOpusListByUserId)
//根据类型查找作品
router.post('/label',OpusController.findOpusByLabel)
//根据关键词查找作品
router.post('/key',OpusController.findOpusByKeyDim)
//上传照片
router.post('/upload',upload.single("utils"),OpusController.upload)
export default router
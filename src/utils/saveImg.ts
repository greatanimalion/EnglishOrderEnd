import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
function saveImg(file: any) {
  return new Promise((resolve, reject) => {
    fs.readFile(file.path, async (err:any, data:any) => {
      if (err) {reject(err)}
      let extName = file.mimetype.split('/')[1]// 拓展名
      let imgName = `${Date.now()}.${extName}`
      //存入的地址
      await fs.writeFile(path.join(__dirname, `../../public/imgs/${imgName}`), data, (err:any) => {
        if (err) { reject(err) }
        resolve(`/public/imgs/${imgName}`)
      })
      // 删除二进制文件
      await fs.unlink(file.path, (err:any) => {
        if (err) { reject(err) }
      })
    })
  })
}
export function deleteImg(src:string){
  return new Promise((resolve, reject) => {
    fs.unlink(path.join(__dirname, `../..${src}`), (err:any) => {
      if (err) { reject(err) }
      resolve({success:true})
    })
  })
}
export default saveImg
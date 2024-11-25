import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const imgExt=['jpg', 'jpeg', 'png', 'gif']
const videoExt=['mp4', 'avi', 'wmv', 'rmvb', 'flv']
function saveImg(file: any) {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(file.path, async (err:any, data:any) => {
      if (err) {reject(err)}
      let extName = file.mimetype.split('/')[1]// 拓展名
      let type=''
      if(imgExt.includes(extName))type='imgs'
      else if(videoExt.includes(extName))type='videos'
      let imgName = `${Date.now()}.${extName}`
      //存入的地址
      await fs.writeFile(path.join(__dirname, `../../public/${type}/${imgName}`), data, (err:any) => {
        if (err) { reject(err) }
        resolve(`/public/${type}/${imgName}`)
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
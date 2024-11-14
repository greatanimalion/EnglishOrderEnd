import { Response, Request } from 'express';
import OpusService from '../service/OpusService.js';
import response from '../utils/response.js';
import saveImg from '../utils/saveImg.js';
class OpusController {
    getOpusById(req: Request, res: Response) {
        const id = +req.params.id;
        if (!id) response.error('参数错误', 'error', 404);
        OpusService.getOpusById(+req.params.id)
        res.send('OpusController.getOpus');
    }
    async addOpus(req: Request, res: Response) {
        res.send('OpusController.addOpus');
        let imgUrl;
        try{
             imgUrl = await saveImg(req.file)
        }catch(e){
           return console.log(e)
        }
        console.log(imgUrl);
    
    }
}
export default new OpusController();
import { Response, Request } from 'express';
import OpusService from '../service/OpusService.js';
import response from '../utils/response.js';
import saveImg from '../utils/saveImg.js';
class OpusController {
    getOpusById(req: Request, res: Response) {
        const id = +req.params.id;
        if (!id) response.error('参数错误', 'error', 404);
        OpusService.getOpusById(+req.params.id).then((result:any) => {
            if (result) {
                res.json(response.success(result, 'success', 200));
            } else {
                response.error('获取失败', 'error', 404);
            }
        });
    }
    async createOpus(req: Request, res: Response) {
        res.json(response.success('上传成功', 'success', 200))
        console.log(req.body)
        const { title, userId, time, intro } = req.body;
        if (!title || !userId || !time || !intro) {
            response.error('参数错误', 'error', 400)
            return
        }
        try {
            let src = await saveImg(req.file) as string
            OpusService.createOpus({ title, userId, time, intro, src });
        } catch (e) {
            response.error('创建失败', 'error', 500)
            return
        }
        response.success('创建成功', 'success', 200)

    }
    deleteOpus(req: Request, res: Response) {
        const id = +req.params.id;
        res.send('OpusController.deleteOpus');
    }
    updateOpus(req: Request, res: Response) {
        res.send('OpusController.updateOpus');
    }
}
export default new OpusController();
import { Response, Request } from 'express';
import OpusService from '../service/OpusService.js';
import response from '../utils/response.js';

class OpusController {
    getOpusById(req: Request, res: Response) {
        const id = +req.params.id;
        if (!id) response.error('参数错误', 'error', 404);
        OpusService.getOpusById(+req.params.id).then((result: any) => {
            if (result) {
                res.json(response.success(result, 'success', 200));
            } else {
                res.json(response.error('获取失败', 'error', 404));
            }
        });
    }
    async createOpus(req: Request, res: Response) {
        res.json(response.success('上传成功', 'success', 200))
        console.log(req.body)
        const { title, userId, time, intro } = req.body;
        if (!title || !userId || !time || !intro) {
            res.json(response.error('参数错误', 'error', 400))
            return
        }
        let result = await OpusService.createOpus({ title, userId, time, intro }, req.file) as any;
        if (result.error) {
            response.error("服务器内部错误", 'error', 500)
            return
        }
        response.success('创建成功', 'success', 200)
    }
    async deleteOpus(req: Request, res: Response) {
        const id = req.body.id;
        console.log(req.body,id);
        if(!id){res.json(response.error('参数错误', 'error', 404));return}
        let result = await OpusService.opusDelete(id) as any;
        if(result.error)res.json(response.error('删除失败', 'error', 404));
        else res.json(response.success('删除成功', 'success', 200));
        
    }
    updateOpus(req: Request, res: Response) {
        res.send('OpusController.updateOpus');
    }
}
export default new OpusController();
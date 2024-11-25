import { Response, Request } from 'express';
import OpusService from '../service/OpusService.js';
import response from '../utils/response.js';
class OpusController {
    getOpusById(req: Request, res: Response) {
        const id = +req.params.id;
        if (!id) { res.json(response.error(0)); return;}
        OpusService.getOpusById(+req.params.id).then((result: any) => {
            if (result) {
                res.json(response.success(result, 'success', 200));
            } else {
                res.json(response.error(4));
            }
        });
    }
    getOpusListByUserId(req: Request, res: Response) {
        const {userId,page,limit} = req.body;
        if (!userId||!page||!limit){
            res.json(response.error(0));
            return 
        }
        OpusService.getOpusByUserId({userId,page,limit}).then((result: any) => {
            if (result) {
                res.json(response.success(result, 'success', 200));
            } else {
                res.json(response.error(4));
            }
        }).catch(()=>{
            res.json(response.error(4));
        })

    }
    async createOpus(req: Request, res: Response) {
        const { userId,type } = req.body;
        if (!userId||!type) {
            res.json(response.error(0))
            return
        }
        let result = await OpusService.createOpus({ userId,type }) as any;
        if (result.error) {
            res.json(response.error(1))
            return
        }
        res.json(response.success(result[0], 'success', 200))
    }
    async deleteOpus(req: Request, res: Response) {
        const {userId,opusId} = req.body;
        if(!userId||!opusId){res.json(response.error(0));return}
        let result = await OpusService.opusDelete({userId,opusId}) as any;
        if(result.error)res.json(response.error(5));
        else res.json(response.success('删除成功'));
        
    }
    updateOpus(req: Request, res: Response) {
        const {id, title, time, intro,label,content,coverImg,userId} = req.body;
        if(!id ||!title||!time ||!intro||isNaN(Number(label))||!content||!coverImg||!userId){
            res.json(response.error(0))
            return
        }
        OpusService.updateOpus({id, title, time,userId,intro,label,content,coverImg}).then(()=>{
            res.json(response.success('更新成功'))
        }).catch((e)=>{
            console.log(e);
            
            res.json(response.error(5))
        })
    }
    findOpusByKeyDim(req: Request, res: Response){
        const {key,page,limit} = req.body;
        if(!key||!page||!limit){
            res.json(response.error(1))
            return
        }
        OpusService.findOpusByKeyDim({key,page,limit}).then((result: any) => {
            if (result) {
                res.json(response.success(result, 'success', 200));
            } else {
                res.json(response.error(4));
            }
        }).catch(()=>{
            res.json(response.error(1));
        })
    }
    findOpusByLabel(req: Request, res: Response){
        const {label,page,limit} = req.body;
        if(!label||!page||!limit){
            res.json(response.error(0))
            return
        }
        OpusService.findOpusByType({label,page,limit}).then((result: any) => {
            if (result) {
                res.json(response.success(result, 'success', 200));
            } else {
                res.json(response.error(4));
            }
        }).catch(()=>{
            res.json(response.error(1));
        })
    }
    upload(req:Request,res:Response){
        const file=req.file
        const {userId,opusId}=req.body
        if(!userId||!opusId){
            res.json(response.error(0))
            return
        }
        OpusService.upload({userId,opusId},file).then((e)=>{
            res.json(JSON.stringify({
                errno:0,
                url:e
            }))
        }).catch(()=>{
            res.json(JSON.stringify({
                errorno:1
            }))
        })
    }
}
export default new OpusController();
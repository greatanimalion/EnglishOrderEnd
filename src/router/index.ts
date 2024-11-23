import  Express  from 'express';
import opusRouter from './opusRouter.js'
import userRouter from './userRouter.js'
import commentRouter from './commentRouter.js'
const router = Express.Router();
router.use('/opus', opusRouter);
router.use('/user', userRouter);
router.use('/comment', commentRouter);

export default router; 


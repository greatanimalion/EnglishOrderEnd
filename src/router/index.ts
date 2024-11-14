import  Express  from 'express';
import opusRouter from './opusRouter.js'
import userRouter from './userRouter.js'

const router = Express.Router();
router.use('/opus', opusRouter);
router.use('/user', userRouter);


export default router; 


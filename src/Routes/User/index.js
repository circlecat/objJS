import { Router } from 'express';
import userController from '../../Controllers/User';

const userRouter = Router();

userRouter.use('/', userController.getUser);

export default userRouter;

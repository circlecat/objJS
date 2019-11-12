import { Router } from 'express';
import userController from '../../Controllers/User';

const userRouter = Router();

userRouter.get('/', userController.get);
userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);

export default userRouter;

import { Router } from 'express';
import {
  get,
  register,
  login,
  refreshToken,
  revokeRefreshToken,
} from '../../Controllers/User';
import isAuth from '../../Controllers/User/isAuth';

const userRouter = Router();

userRouter.get('/', isAuth, get);
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/refresh_token', refreshToken);
userRouter.get('/revoke_refresh_token', isAuth, revokeRefreshToken);

export default userRouter;

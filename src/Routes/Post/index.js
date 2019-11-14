import { Router } from 'express';
import { create, get, getAll } from '../../Controllers/Post';
import isAuth from '../Utils/isAuth';

const postRouter = Router();

postRouter.post('/', isAuth, create);
postRouter.get('/getAll', isAuth, getAll);
postRouter.get('/:id', get);

export default postRouter;

import { Router } from 'express';
import {
  create,
  get,
  getAll,
  update,
  remove,
} from '../../Controllers/Post';
import isAuth from '../Utils/isAuth';

const postRouter = Router();

postRouter.post('/', isAuth, create);
postRouter.get('/getAll', isAuth, getAll);
postRouter.get('/:id', get);
postRouter.put('/:id', isAuth, update);
postRouter.delete('/:id', isAuth, remove);

export default postRouter;

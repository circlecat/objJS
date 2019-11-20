import { Router } from 'express';
import {
  create,
  get,
  getAll,
  update,
  remove,
} from '../../Controllers/Dictionary';
import isAuth from '../Utils/isAuth';

const dictionaryRouter = Router();

dictionaryRouter.post('/', isAuth, create);
dictionaryRouter.get('/getAll', isAuth, getAll);
dictionaryRouter.get('/:id', get);
dictionaryRouter.put('/:id', isAuth, update);
dictionaryRouter.delete('/:id', isAuth, remove);


export default dictionaryRouter;

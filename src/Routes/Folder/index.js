import { Router } from 'express';
import {
  create,
  get,
  getAll,
  update,
  remove,
} from '../../Controllers/Folder';
import isAuth from '../Utils/isAuth';

const folderRouter = Router();

folderRouter.post('/', isAuth, create);
folderRouter.get('/getAll', isAuth, getAll);
folderRouter.get('/:id', get);
folderRouter.put('/:id', isAuth, update);
folderRouter.delete('/:id', isAuth, remove);


export default folderRouter;

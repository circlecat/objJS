import { Router } from 'express';
import { create, get, getAll } from '../../Controllers/Folder';
import isAuth from '../Utils/isAuth';

const folderRouter = Router();

folderRouter.post('/', isAuth, create);
folderRouter.get('/getAll', isAuth, getAll);
folderRouter.get('/:id', get);

export default folderRouter;

import { Router } from 'express';
import userRouter from './User';
import folderRouter from './Folder';
import dictionaryRouter from './Dictionary';

const router = Router();

router.use('/user', userRouter);
router.use('/folder', folderRouter);
router.use('/dictionary', dictionaryRouter);

export default router;

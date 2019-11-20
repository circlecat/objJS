import { Router } from 'express';
import userRouter from './User';
import folderRouter from './Folder';

const router = Router();

router.use('/user', userRouter);
router.use('/folder', folderRouter);

export default router;

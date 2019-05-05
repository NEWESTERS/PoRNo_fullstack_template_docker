import { Router } from 'express';

import { authRouter, verifyToken } from './Authentication';
import { exampleRouter } from './Example';

const router = Router(),
    secureRouter = Router();

router.use('/authenticate', authRouter);
secureRouter.use(verifyToken);

router.use('/example', exampleRouter);

export { router, secureRouter };
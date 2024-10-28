import { Router } from 'express';
import authController from './controller';

const authRouter = Router();
authRouter.post("/register", authController.register);

export default authRouter;

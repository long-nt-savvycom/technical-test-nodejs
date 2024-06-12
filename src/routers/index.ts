import * as express from 'express';
import { authRouter } from './auth.route';
import { userRouter } from './user.route';

export const routes = express.Router();

routes.use('/user', userRouter);
routes.use('/auth', authRouter);

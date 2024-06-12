import * as express from 'express';
import { authRouter } from './auth.route';
import { gameItemRouter } from './game-item.route';
import { userRouter } from './user.route';

export const routes = express.Router();

routes.use('/user', userRouter);
routes.use('/auth', authRouter);
routes.use('/game-item', gameItemRouter);

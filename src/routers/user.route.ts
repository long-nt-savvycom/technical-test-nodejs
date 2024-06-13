import * as express from 'express';
import { authentication } from '../middlewares/authentication.middleware';
import { UserController } from '../modules/user/user.controller';
const Router = express.Router();
const userController = UserController.getInstance();

Router.get('/profile', authentication, userController.getProfile);
export { Router as userRouter };

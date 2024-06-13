import { AuthUserRequest } from '@auth/auth.interface';
import * as express from 'express';
import { authentication } from '../middlewares/authentication.middleware';
import { UserController } from '../modules/user/user.controller';
const Router = express.Router();
const userController = UserController.getInstance();

Router.get('/profile', authentication, async (req: AuthUserRequest, res, next) => {
  /* 
      #swagger.security = [{
            "bearerAuth": []
      }] 
    */
  await userController.getProfile(req, res, next);
});

export { Router as userRouter };

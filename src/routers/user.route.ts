import { AuthUserRequest } from '@auth/auth.interface';
import { authentication } from '@middlewares/authentication.middleware';
import { UserController } from '@user/user.controller';
import * as express from 'express';
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

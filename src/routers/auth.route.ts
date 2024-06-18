import { AuthController } from '@auth/auth.controller';
import { loginRateLimiter } from '@auth/auth.service';
import { SignUpDto } from '@auth/dto/sign-up.dto';
import { dtoValidationMiddleware } from '@middlewares/dto-validator.middleware';
import * as express from 'express';
const Router = express.Router();
const authController = AuthController.getInstance();

Router.post('/signup', dtoValidationMiddleware(SignUpDto), async (req, res, next) => {
  /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                      $ref: "#/components/schemas/loginSchema"
                    }
                }
            }
        } 
    */
  await authController.signup(req, res, next);
});

Router.post(
  '/login',
  loginRateLimiter,
  dtoValidationMiddleware(SignUpDto),
  async (req, res, next) => {
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                      $ref: "#/components/schemas/loginSchema"
                    }
                }
            }
        } 
    */
    await authController.login(req, res, next);
  },
);

export { Router as authRouter };

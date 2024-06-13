import { AuthController } from '@auth/auth.controller';
import { SignUpDto } from '@auth/dto/sign-up.dto';
import { dtoValidationMiddleware } from '@middleware/dto-validator.middleware';
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

Router.post('/login', dtoValidationMiddleware(SignUpDto), async (req, res, next) => {
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
});

export { Router as authRouter };

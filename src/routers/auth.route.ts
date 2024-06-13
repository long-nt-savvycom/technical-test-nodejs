import { AuthController } from '@auth/auth.controller';
import { SignUpDto } from '@auth/dto/sign-up.dto';
import { dtoValidationMiddleware } from '@middleware/dto-validator.middleware';
import * as express from 'express';
const Router = express.Router();
const authController = AuthController.getInstance();

Router.post('/signup', dtoValidationMiddleware(SignUpDto), authController.signup);

Router.post('/login', dtoValidationMiddleware(SignUpDto), authController.login);

export { Router as authRouter };

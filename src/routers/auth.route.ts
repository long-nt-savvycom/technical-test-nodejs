import * as express from 'express';
import { AuthController } from '../auth/auth.controller';
const Router = express.Router();
const authController = AuthController.getInstance();

// Router.get('/users', authentification, authorization(['admin']), UserController.getUsers);
// Router.get(
//   '/profile',
//   authentification,
//   authorization(['user', 'admin']),
//   AuthController.getProfile,
// );
Router.post('/signup', authController.signup);
Router.post('/login', authController.login);
// Router.put(
//   '/update/:id',
//   authentification,
//   authorization(['user', 'admin']),
//   UserController.updateUser,
// );
// Router.delete(
//   '/delete/:id',
//   authentification,
//   authorization(['admin']),
//   UserController.deleteUser,
// );
export { Router as authRouter };


import * as express from 'express';
import { authentication } from '../middlewares/auth.middleware';
import { UserController } from '../user/user.controller';
const Router = express.Router();
const userController = UserController.getInstance();

// Router.get('/users', authentification, authorization(['admin']), UserController.getUsers);
Router.get(
  '/profile',
  authentication,
  // authorization(['user', 'admin']),
  userController.getProfile,
);
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
export { Router as userRouter };

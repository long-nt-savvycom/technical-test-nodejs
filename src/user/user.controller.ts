import { NextFunction, Response } from 'express';
import { AuthUserRequest } from '../auth/auth.interface';
import { userService } from './user.service';

export class UserController {
  private static _instance: UserController;
  static getInstance() {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new UserController();
    return this._instance;
  }

  public async getProfile(
    req: AuthUserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.user.userId;
      console.log({ userId });
      const resData = await userService.getProfile({ id: userId });
      res.json({
        success: true,
        data: resData,
      });
    } catch (err) {
      next(err);
    }
  }

  // public async signup(req: Request, res: Response): Promise<void> {
  //   // const authService = AuthService.getInstance();
  //   console.log({ body: req.body });
  //   await authService.signUp(req.body as SignUpBody);
  //   res.json({
  //     success: true,
  //     message: 'Create User',
  //   });
  // }

  // authRoute.get('/refresh-token', (req: Request, res: Response): void => {
  //   res.json({
  //     success: true,
  //     message: 'Get One User',
  //   });
  // });

  // authRoute.get('/logout', (req: Request, res: Response): void => {
  //   res.json({
  //     success: true,
  //     message: 'Update One User',
  //   });
  // });
}

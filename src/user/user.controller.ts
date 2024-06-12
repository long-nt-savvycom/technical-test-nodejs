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
      const resData = await userService.getProfile({ id: userId });
      res.json({
        success: true,
        data: resData,
      });
    } catch (err) {
      next(err);
    }
  }
}

import { NextFunction, Response } from 'express';
import { userService } from './user.service';
import { AuthUserRequest } from '@auth/auth.interface';

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
      res.locals.data = await userService.getProfile({ id: userId });
      next()
    } catch (err) {
      next(err);
    }
  }
}

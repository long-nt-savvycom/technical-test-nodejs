import { NextFunction, Request, Response } from 'express';
import { authService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';

export class AuthController {
  private static _instance: AuthController;
  static getInstance() {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new AuthController();
    return this._instance;
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const resData = await authService.login(req.body as SignUpDto);
      res.json({
        success: true,
        data: resData,
      });
    } catch (err) {
      next(err);
    }
  }

  public async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const resData = await authService.signUp(req.body as SignUpDto);
      res.json({
        success: true,
        data: resData,
      });
    } catch (err) {
      next(err);
    }
  }

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

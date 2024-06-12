import { NextFunction, Response } from 'express';
import { AuthUserRequest } from '../auth/auth.interface';
import { BuyItemDto } from './dto/buy-item.dto';
import { DefineItemDto } from './dto/define-item.dto';
import { RemoveUserItem } from './dto/remove-user-item.dto';
import { UpdateItemLevelDto } from './dto/update-item-level.dto';
import { gameItemService } from './game-item.service';

export class GameItemController {
  private static _instance: GameItemController;
  static getInstance() {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new GameItemController();
    return this._instance;
  }

  public async createItem(
    req: AuthUserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const resData = await gameItemService.defineItem(req.body as DefineItemDto);
      res.json({
        success: true,
        data: resData,
      });
    } catch (err) {
      next(err);
    }
  }

  public async getItemStore(
    req: AuthUserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const resData = await gameItemService.listItem(req.body);
      res.json({
        success: true,
        data: resData,
      });
    } catch (err) {
      next(err);
    }
  }

  public async buyItem(
    req: AuthUserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.user.userId;
      const resData = await gameItemService.buyItem(
        userId,
        (req.body as BuyItemDto).itemId,
      );
      res.json({
        success: true,
        data: resData,
      });
    } catch (err) {
      next(err);
    }
  }

  public async getMyItems(
    req: AuthUserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.user.userId;
      const resData = await gameItemService.getUserItems(userId, req.body);
      res.json({
        success: true,
        data: resData,
      });
    } catch (err) {
      next(err);
    }
  }

  public async updateUserItemLevel(
    req: AuthUserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const resData = await gameItemService.updateLevelItem(<UpdateItemLevelDto>req.body);
      res.json({
        success: true,
        data: resData,
      });
    } catch (err) {
      next(err);
    }
  }

  public async removeUserItem(
    req: AuthUserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const resData = await gameItemService.removeItem(
        (<RemoveUserItem>req.body).userItemId,
      );
      res.json({
        success: true,
        data: resData,
      });
    } catch (err) {
      next(err);
    }
  }
}

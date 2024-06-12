import * as express from 'express';
import { PagingDto } from '../common/dto/paging.dto';
import { Roles } from '../database/entity/User';
import { BuyItemDto } from '../game-item/dto/buy-item.dto';
import { DefineItemDto } from '../game-item/dto/define-item.dto';
import { GetItemStoreDto } from '../game-item/dto/get-item-store.dto';
import { RemoveUserItem } from '../game-item/dto/remove-user-item.dto';
import { UpdateItemLevelDto } from '../game-item/dto/update-item-level.dto';
import { GameItemController } from '../game-item/game-item.controller';
import { authentication } from '../middlewares/authentication.middleware';
import { authorization } from '../middlewares/authorization.middleware';
import { dtoValidationMiddleware } from '../middlewares/dto-validator.middleware';

const Router = express.Router();
const gameItemController = GameItemController.getInstance();

Router.post(
  '/define-item',
  authentication,
  authorization([Roles.Admin]),
  dtoValidationMiddleware(DefineItemDto),
  gameItemController.createItem,
);

Router.post(
  '/buy-item',
  authentication,
  authorization([Roles.User]),
  dtoValidationMiddleware(BuyItemDto),
  gameItemController.buyItem,
);

Router.get(
  '/item-store',
  authentication,
  authorization([Roles.User]),
  dtoValidationMiddleware(GetItemStoreDto),
  gameItemController.getItemStore,
);

Router.get(
  '/my-items',
  authentication,
  authorization([Roles.User]),
  dtoValidationMiddleware(PagingDto),
  gameItemController.getMyItems,
);

Router.patch(
  '/update-level',
  authentication,
  authorization([Roles.User]),
  dtoValidationMiddleware(UpdateItemLevelDto),
  gameItemController.updateUserItemLevel,
);

Router.delete(
  '/user-item',
  authentication,
  authorization([Roles.User]),
  dtoValidationMiddleware(RemoveUserItem),
  gameItemController.removeUserItem,
);

export { Router as gameItemRouter };

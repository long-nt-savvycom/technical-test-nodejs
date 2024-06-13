import * as express from 'express';
import { PagingDto } from '../utils/dto/paging.dto';
import { BuyItemDto } from '../modules/game-item/dto/buy-item.dto';
import { DefineItemDto } from '../modules/game-item/dto/define-item.dto';
import { GetItemStoreDto } from '../modules/game-item/dto/get-item-store.dto';
import { RemoveUserItem } from '../modules/game-item/dto/remove-user-item.dto';
import { UpdateItemLevelDto } from '../modules/game-item/dto/update-item-level.dto';
import { GameItemController } from '../modules/game-item/game-item.controller';
import { authentication } from '../middlewares/authentication.middleware';
import { authorization } from '../middlewares/authorization.middleware';
import { dtoValidationMiddleware } from '../middlewares/dto-validator.middleware';
import { Roles } from '@user/entities/user.model';

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

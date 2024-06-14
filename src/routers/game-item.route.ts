import { AuthUserRequest } from '@auth/auth.interface';
import { BuyItemDto } from '@game-item/dto/buy-item.dto';
import { DefineItemDto } from '@game-item/dto/define-item.dto';
import { GetItemStoreDto } from '@game-item/dto/get-item-store.dto';
import { RemoveUserItem } from '@game-item/dto/remove-user-item.dto';
import { UpdateItemLevelDto } from '@game-item/dto/update-item-level.dto';
import { GameItemController } from '@game-item/game-item.controller';
import { authentication } from '@middlewares/authentication.middleware';
import { authorization } from '@middlewares/authorization.middleware';
import { dtoValidationMiddleware } from '@middlewares/dto-validator.middleware';
import { Roles } from '@user/entities/user.model';
import { PagingDto } from '@utils/dto/paging.dto';
import * as express from 'express';

const Router = express.Router();
const gameItemController = GameItemController.getInstance();

Router.post(
  '/define-item',
  authentication,
  authorization([Roles.Admin]),
  dtoValidationMiddleware(DefineItemDto),
  async (req: AuthUserRequest, res, next) => {
    /*  
      #swagger.security = [{
            "bearerAuth": []
      }] 
      #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                      $ref: "#/components/schemas/defineItemSchema"
                    }
                }
            }
        } 
    */
    await gameItemController.createItem(req, res, next);
  },
);

Router.post(
  '/buy-item',
  authentication,
  authorization([Roles.User]),
  dtoValidationMiddleware(BuyItemDto),
  async (req: AuthUserRequest, res, next) => {
    /*  
      #swagger.security = [{
            "bearerAuth": []
      }] 
      #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                      $ref: "#/components/schemas/buyItemSchema"
                    }
                }
            }
        } 
    */
    await gameItemController.buyItem(req, res, next);
  },
);

Router.get(
  '/item-store',
  authentication,
  authorization([Roles.User]),
  dtoValidationMiddleware(GetItemStoreDto),
  async (req: AuthUserRequest, res, next) => {
    /*  
      #swagger.security = [{
            "bearerAuth": []
      }] 
    */
    await gameItemController.getItemStore(req, res, next);
  },
);

Router.get(
  '/my-items',
  authentication,
  authorization([Roles.User]),
  dtoValidationMiddleware(PagingDto),
  async (req: AuthUserRequest, res, next) => {
    /*  
      #swagger.security = [{
            "bearerAuth": []
      }] 
    */
    await gameItemController.getMyItems(req, res, next);
  },
);

Router.patch(
  '/update-level',
  authentication,
  authorization([Roles.User]),
  dtoValidationMiddleware(UpdateItemLevelDto),
  async (req: AuthUserRequest, res, next) => {
    /*  
      #swagger.security = [{
            "bearerAuth": []
      }] 
      #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                      $ref: "#/components/schemas/updateItemLevelSchema"
                    }
                }
            }
        } 
    */
    await gameItemController.updateUserItemLevel(req, res, next);
  },
);

Router.delete(
  '/user-item',
  authentication,
  authorization([Roles.User]),
  dtoValidationMiddleware(RemoveUserItem),
  async (req: AuthUserRequest, res, next) => {
    /*  
      #swagger.security = [{
            "bearerAuth": []
      }] 
      #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                      $ref: "#/components/schemas/removeUserItemSchema"
                    }
                }
            }
        } 
    */
    await gameItemController.removeUserItem(req, res, next);
  },
);
export { Router as gameItemRouter };

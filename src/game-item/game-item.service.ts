import { PagingDto } from '../common/dto/paging.dto';
import { DefineItemDto } from './dto/define-item.dto';
import { GetItemStoreDto } from './dto/get-item-store.dto';
import { UpdateItemLevelDto } from './dto/update-item-level.dto';
import { itemRepository } from './item.repository';
import { userItemRepository } from './user-item.repository';

export class GameItemService {
  private static _instance: GameItemService;
  static getInstance() {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new GameItemService();
    return this._instance;
  }

  async defineItem(body: DefineItemDto) {
    return itemRepository.create(body);
  }

  async listItem(body: GetItemStoreDto) {
    return itemRepository.findMany({}, body);
  }

  async buyItem(userId: string, itemId: string) {
    const item = await itemRepository.findOne({ id: itemId });
    if (!item) {
      throw new Error('Item not found');
    }
    return userItemRepository.create({ userId, itemId });
  }

  async getUserItems(userId: string, options: PagingDto) {
    return userItemRepository.findMany({ userId }, options);
  }

  async updateLevelItem(data: UpdateItemLevelDto): Promise<boolean> {
    const userItem = await userItemRepository.findOne({ id: data.userItemId });
    if (!userItem) {
      throw new Error('User Item not found');
    }

    if (userItem.level === data.level) {
      return false;
    }
    if (userItem.level > data.level) {
      throw new Error('Can not downgrade item level');
    }
    return userItemRepository.update(data.userItemId, { level: data.level });
  }

  async removeItem(userItemId: string) {
    const userItem = await userItemRepository.findOne({ id: userItemId });
    if (!userItem) {
      throw new Error('User Item not found');
    }

    return userItemRepository.delete(userItemId);
  }
}

export const gameItemService = GameItemService.getInstance();

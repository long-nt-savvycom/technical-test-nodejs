import 'dotenv/config';
import { users } from '@auth/auth.service.test';
import { BuyItemDto } from './dto/buy-item.dto';
import { DefineItemDto } from './dto/define-item.dto';
import { UpdateItemLevelDto } from './dto/update-item-level.dto';
import { Item } from './entities/item.model';
import { UserItem } from './entities/user-item.model';
import { GameItemService } from './game-item.service';
import { ItemRepository } from './item.repository';
import { UserItemRepository } from './user-item.repository';
import * as crypto from  'crypto';

const items: Item[] = [
  {
    id: 'abc',
    description: 'des1',
    name: 'item1',
    updatedAt: new Date(),
    createdAt: new Date(),
    deletedAt: new Date(),
    userItems: [],
  },
];

const mockFindOneFunction = jest
  .spyOn(ItemRepository.prototype, 'findOne')
  .mockImplementation(async (a: Partial<Item>): Promise<Item> => {
    return items.find((u) => u.name === a.name || u.id === a.id);
  });

const mockCreateFunction = jest
  .spyOn(ItemRepository.prototype, 'create')
  .mockImplementation(async (a: Partial<Item>): Promise<Item> => {
    const e = items.find((u) => u.name === a.name);
    if (!e) {
      return items[0];
    }
  });

test('define right item', async () => {
  const authService = GameItemService.getInstance();
  const testData: DefineItemDto = { name: 'abc123', description: 'abc123' };
  const res = await authService.defineItem(testData);
  expect(mockFindOneFunction).toHaveBeenCalled();
  expect(res).toHaveProperty('id');
  expect(res).toHaveProperty('name');
  expect(res).toHaveProperty('description');
});

test('define existed item', async () => {
  const authService = GameItemService.getInstance();
  const testData: DefineItemDto = { name: items[0].name, description: 'abc123' };
  try {
    const res = await authService.defineItem(testData);
  } catch (error) {
    expect(error.message).toMatch('Item name existed');
  }
});

const userItems: UserItem[] = [
  {
    id: 'abc',
    userId: users[0].id,
    itemId: items[0].id,
    updatedAt: new Date(),
    createdAt: new Date(),
    deletedAt: new Date(),
    user: users[0],
    item: items[0],
    level: 1,
  },
];

const mockFindOneUserItemFunction = jest
  .spyOn(UserItemRepository.prototype, 'findOne')
  .mockImplementation(async (a: Partial<UserItem>): Promise<UserItem> => {
    return userItems.find((u) => u.id === a.id && u.userId === a.userId);
  });

const mockCreateUserItemFunction = jest
  .spyOn(UserItemRepository.prototype, 'create')
  .mockImplementation(async (a: Partial<UserItem>): Promise<UserItem> => {
    const e = items.find((u) => u.id === a.id);
    if (!e) {
      return userItems[0];
    }
  });

const mockUpdateUserItemFunction = jest
  .spyOn(UserItemRepository.prototype, 'update')
  .mockImplementation(async (id, body: Partial<UserItem>): Promise<boolean> => {
    const e = items.find((u) => u.id === id);
    if (e) {
      return true;
    }
    return false;
  });

test('buy right item', async () => {
  const userId: string = users[0].id;
  const service = GameItemService.getInstance();
  const testData: BuyItemDto = { itemId: items[0].id };
  const res = await service.buyItem(userId, testData.itemId);
  expect(res).toHaveProperty('id');
  expect(res).toHaveProperty('userId');
  expect(res).toHaveProperty('itemId');
});

test('buy not existed item', async () => {
  const userId = 'abc';
  const service = GameItemService.getInstance();
  const testData: BuyItemDto = { itemId: crypto.randomUUID() };
  try {
    const res = await service.buyItem(userId, testData.itemId);
  } catch (error) {
    expect(error.message).toMatch('Item not found');
  }
});

test('update right item level', async () => {
  const userId = userItems[0].userId;
  const service = GameItemService.getInstance();
  const testData: UpdateItemLevelDto = { userItemId: userItems[0].id, level: 2 };
  const res = await service.updateLevelItem(userId, testData);
  expect(res).toBe(true);
});

test('update item level with wrong user', async () => {
  const userId = crypto.randomUUID();
  const service = GameItemService.getInstance();
  const testData: UpdateItemLevelDto = { userItemId: userItems[0].id, level: 2 };
  try {
    const res = await service.updateLevelItem(userId, testData);
  } catch (error) {
    expect(error.message).toMatch('User Item not found');
  }
});

test('update item level with level have not changed', async () => {
  const userId = userItems[0].userId;
  const service = GameItemService.getInstance();
  const testData: UpdateItemLevelDto = {
    userItemId: userItems[0].id,
    level: userItems[0].level,
  };
  const res = await service.updateLevelItem(userId, testData);
  expect(res).toBe(false);
});

test('update item level with level smaller than current level', async () => {
  const userId = userItems[0].userId;
  const service = GameItemService.getInstance();
  const testData: UpdateItemLevelDto = {
    userItemId: userItems[0].id,
    level: userItems[0].level - 1,
  };
  try {
    const res = await service.updateLevelItem(userId, testData);
  } catch (error) {
    expect(error.message).toMatch('Can not downgrade item level');
  }
});

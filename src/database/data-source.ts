import config from '@configs/index';
import { Item } from '@game-item/entities/item.model';
import { UserItem } from '@game-item/entities/user-item.model';
import { User } from '@user/entities/user.model';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  ...config.database,
  type: 'postgres',
  synchronize: true,
  logging: false,
  entities: [User, Item, UserItem],
  migrations: [],
  subscribers: [],
});

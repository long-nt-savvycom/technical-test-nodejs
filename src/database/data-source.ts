import 'reflect-metadata';
import { DataSource } from 'typeorm';
import config from '../config';
import { Item } from './entity/Item';
import { User } from './entity/User';
import { UserItem } from './entity/UserItem';

export const AppDataSource = new DataSource({
  ...config.database,
  type: 'postgres',
  synchronize: true,
  logging: false,
  entities: [User, Item, UserItem],
  migrations: [],
  subscribers: [],
});

import 'reflect-metadata';
import { DataSource } from 'typeorm';
import config from '../config';
import { GameItem } from './entity/GameItem';
import { User } from './entity/User';

export const AppDataSource = new DataSource({
  ...config.database,
  type: 'postgres',
  synchronize: true,
  logging: false,
  entities: [User, GameItem],
  migrations: [],
  subscribers: [],
});

import 'reflect-metadata';
import { DataSource } from 'typeorm';
import config from '../configs';

export const AppDataSource = new DataSource({
  ...config.database,
  type: 'postgres',
  synchronize: true,
  logging: false,
  entities: [__dirname + '/../**/*.model.{js,ts}'],
  migrations: [],
  subscribers: [],
});

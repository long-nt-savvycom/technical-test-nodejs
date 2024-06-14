import 'dotenv/config';
import { users } from '@auth/auth.service.test';
import { User } from '@user/entities/user.model';
import { UserRepository } from '@user/user.repository';
import * as crypto from 'crypto';
import { UserService } from './user.service';

const mockFindOneFunction = jest
  .spyOn(UserRepository.prototype, 'findOne')
  .mockImplementation(async (a: Partial<User>): Promise<User> => {
    return users.find((u) => u.username === a.username || u.id === a.id);
  });

test('get profile with right user', async () => {
  const service = UserService.getInstance();
  const testData: Partial<User> = { id: users[0].id };
  const res = await service.getProfile(testData);
  expect(mockFindOneFunction).toHaveBeenCalled();
  expect(res).toHaveProperty('id');
  expect(res).toHaveProperty('username');
});

test('get profile with other user', async () => {
  const service = UserService.getInstance();
  const testData: Partial<User> = { id: crypto.randomUUID() };
  try {
    const res = await service.getProfile(testData);
  } catch (error) {
    expect(error.message).toMatch('User not found');
  }
});

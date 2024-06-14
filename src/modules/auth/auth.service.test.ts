import 'dotenv/config';
import { Roles, User } from '@user/entities/user.model';
import { UserRepository } from '@user/user.repository';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';

export const users: User[] = [
  {
    id: 'abc',
    username: 'abc123',
    password: '$2b$12$8Zh4mN7wPS4RKaCpWpxvnO5MVf/DenJZVd8rX92mbHZ.M/sU1GhF2',
    updatedAt: new Date(),
    createdAt: new Date(),
    role: Roles.User,
    items: [],
    deletedAt: new Date(),
  },
];
const mockFindOneFunction = jest
  .spyOn(UserRepository.prototype, 'findOne')
  .mockImplementation(async (a: Partial<User>): Promise<User> => {
    return users.find((u) => u.username === a.username);
  });

const mockCreateFunction = jest
  .spyOn(UserRepository.prototype, 'create')
  .mockImplementation(async (a: Partial<User>): Promise<User> => {
    const e = users.find((u) => u.username === a.username);
    if (!e) {
      return users[0];
    }
  });

test('login with right user', async () => {
  const authService = AuthService.getInstance();
  const testData: SignUpDto = { username: 'abc123', password: 'abc123' };
  const res = await authService.login(testData);
  expect(mockFindOneFunction).toHaveBeenCalled();
  expect(res).toHaveProperty('accessToken');
  expect(res).toHaveProperty('refreshToken');
});

test('login with other user', async () => {
  const authService = AuthService.getInstance();
  const testData: SignUpDto = { username: 'abc124', password: 'abc123' };
  try {
    const res = await authService.login(testData);
  } catch (error) {
    expect(error.message).toMatch('User not found');
  }
});

test('login with wrong password', async () => {
  const authService = AuthService.getInstance();
  const testData: SignUpDto = {
    username: users[0].username,
    password: users[0].password,
  };
  try {
    const res = await authService.login(testData);
  } catch (error) {
    expect(error.message).toMatch('Password wrong');
  }
});

test('signup with right user', async () => {
  const authService = AuthService.getInstance();
  const testData: SignUpDto = { username: 'abc124', password: 'abc123' };
  const res = await authService.signUp(testData);
  expect(mockCreateFunction).toHaveBeenCalled();
  expect(mockFindOneFunction).toHaveBeenCalled();
  expect(res).toHaveProperty('userId');
});

test('signup with existed user', async () => {
  const authService = AuthService.getInstance();
  const testData: SignUpDto = { username: users[0].username, password: 'abc124' };
  try {
    const res = await authService.signUp(testData);
  } catch (error) {
    expect(error.message).toMatch('Username existed');
  }
});

import { User } from './entities/user.model';
import { userRepository } from './user.repository';

export class UserService {
  private static _instance: UserService;
  static getInstance() {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new UserService();
    return this._instance;
  }

  async getProfile(userBody: Partial<User>) {
    const user = await userRepository.findOne(userBody);
    delete user.password;
    return user;
  }
}

export const userService = UserService.getInstance();

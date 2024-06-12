import { User } from '../database/entity/User';
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
    return userRepository.findOne(userBody);
  }

  // async updateProfile(userBody: Partial<User>) {
  //   return userRepository.update(userBody);
  // }
}

export const userService = UserService.getInstance();

import { User } from '../database/entity/User';
import { userRepository } from './game-item.repository';

export class UserService {
  private static _instance: UserService;
  static getInstance() {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new UserService();
    return this._instance;
  }

  async gotItem(userBody: Partial<User>) {
    return userRepository.findOne(userBody);
  }

  async getUserItems(userBody: Partial<User>) {
    return userRepository.findOne(userBody);
  }

  async getDetailItem(userBody: Partial<User>) {
    return userRepository.update(userBody);
  }

  async updateLevelItem(userBody: Partial<User>) {
    return userRepository.update(userBody);
  }

  async removeItem(userBody: Partial<User>) {
    return userRepository.update(userBody);
  }
}

export const userService = UserService.getInstance();

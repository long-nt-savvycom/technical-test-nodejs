import { AppDataSource } from '../database/data-source';
import { User } from '../database/entity/User';

export class UserRepository {
  private userRepository = AppDataSource.getRepository(User);
  private static _instance: UserRepository;
  static getInstance() {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new UserRepository();
    return this._instance;
  }

  async findOne(userBody: Partial<User>): Promise<User> {
    return this.userRepository.findOne({ where: userBody });
  }

  async create(userBody: Partial<User>): Promise<User> {
    return this.userRepository.save(userBody);
  }

  async update(id: string, userBody: Partial<User>) {
    const res = await this.userRepository.update({ id }, userBody);
    return res.affected ? res.affected > 0 : false;
  }

  async delete(id: string): Promise<boolean> {
    const res = await this.userRepository.softDelete({ id });
    return res.affected ? res.affected > 0 : false;
  }
}

export const userRepository = UserRepository.getInstance();

import { PagingDto } from '../common/dto/paging.dto';
import { AppDataSource } from '../database/data-source';
import { UserItem } from '../database/entity/UserItem';

export class UserItemRepository {
  private userItemRepository = AppDataSource.getRepository(UserItem);
  private static _instance: UserItemRepository;
  static getInstance() {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new UserItemRepository();
    return this._instance;
  }

  async findOne(UserItemBody: Partial<UserItem>): Promise<UserItem> {
    return this.userItemRepository.findOne({ where: UserItemBody });
  }

  async findMany(ItemBody: Partial<UserItem>, options?: PagingDto): Promise<UserItem[]> {
    return this.userItemRepository.find({
      where: ItemBody,
      skip: +options.offset || 0,
      take: +options.limit || 10,
    });
  }

  async create(UserItemBody: Partial<UserItem>): Promise<UserItem> {
    return this.userItemRepository.save(UserItemBody);
  }

  async update(id: string, UserItemBody: Partial<UserItem>) {
    const res = await this.userItemRepository.update({id}, UserItemBody);
    return res.affected ? res.affected > 0 : false;
  }

  async delete(id: string): Promise<boolean> {
    const res = await this.userItemRepository.softDelete({ id });
    return res.affected ? res.affected > 0 : false;
  }
}

export const userItemRepository = UserItemRepository.getInstance();

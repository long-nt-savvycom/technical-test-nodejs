import { PagingDto } from '../common/dto/paging.dto';
import { AppDataSource } from '../database/data-source';
import { Item } from '../database/entity/Item';

export class ItemRepository {
  private ItemRepository = AppDataSource.getRepository(Item);
  private static _instance: ItemRepository;
  static getInstance() {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new ItemRepository();
    return this._instance;
  }

  async findOne(ItemBody: Partial<Item>): Promise<Item> {
    return this.ItemRepository.findOne({ where: ItemBody });
  }

  async findMany(ItemBody: Partial<Item>, options?: PagingDto): Promise<Item[]> {
    return this.ItemRepository.find({
      where: ItemBody,
      skip: +options.offset || 0,
      take: +options.limit || 10,
    });
  }

  async create(ItemBody: Partial<Item>): Promise<Item> {
    return this.ItemRepository.save(ItemBody);
  }

  async update(id: string, ItemBody: Partial<Item>) {
    const res = await this.ItemRepository.update({ id }, ItemBody);
    return res.affected ? res.affected > 0 : false;
  }

  async delete(id: string): Promise<boolean> {
    const res = await this.ItemRepository.softDelete({ id });
    return res.affected ? res.affected > 0 : false;
  }
}

export const itemRepository = ItemRepository.getInstance();

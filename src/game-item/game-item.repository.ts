import { AppDataSource } from '../database/data-source';
import { GameItem } from '../database/entity/GameItem';

export class GameItemRepository {
  private GameItemRepository = AppDataSource.getRepository(GameItem);
  private static _instance: GameItemRepository;
  static getInstance() {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new GameItemRepository();
    return this._instance;
  }

  async findOne(GameItemBody: Partial<GameItem>): Promise<GameItem> {
    return this.GameItemRepository.findOne({ where: GameItemBody });
  }

  async create(GameItemBody: Partial<GameItem>): Promise<GameItem> {
    return this.GameItemRepository.save(GameItemBody);
  }

  async update(id: string, GameItemBody: Partial<GameItem>) {
    const res = await this.GameItemRepository.update({ id }, GameItemBody);
    return res.affected ? res.affected > 0 : false;
  }

  async delete(id: string): Promise<boolean> {
    const res = await this.GameItemRepository.softDelete({ id });
    return res.affected ? res.affected > 0 : false;
  }
}

export const gameItemRepository = GameItemRepository.getInstance();

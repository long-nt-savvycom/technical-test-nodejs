import { BaseEntity } from '@database/entity/Base';
import { User } from '@user/entities/user.model';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './item.model';

@Entity({ name: 'user_item' })
export class UserItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.items)
  user: User;

  @Column()
  @JoinColumn({ name: 'userId' })
  itemId: string;

  @ManyToOne(() => Item, (item) => item.userItems)
  @JoinColumn({ name: 'itemId' })
  item: Item;

  @Column({ default: 1 })
  level: number;
}

import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './Base';
import { User } from './User';
import { Item } from './Item';

@Entity({ name: 'user_item' })
export class UserItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @Index()
  userId: string;

  @ManyToOne(() => User, (user) => user.items)
  user: User;

  @Column({ unique: true })
  @JoinColumn({ name: 'userId' })
  @Index()
  itemId: string;

  @ManyToOne(() => Item, (item) => item.userItems)
  @JoinColumn({ name: 'itemId' })
  item: Item;

  @Column({ default: 1 })
  level: number;
}

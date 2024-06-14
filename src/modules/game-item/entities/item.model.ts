import { BaseEntity } from '@database/entity/Base';
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserItem } from './user-item.model';

@Entity({ name: 'item' })
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @Index()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => UserItem, (userItem) => userItem.item)
  userItems: UserItem[];
}

import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './Base';
import { UserItem } from './UserItem';

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

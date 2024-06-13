import { BaseEntity } from '@database/entity/Base';
import { UserItem } from '@game-item/entities/user-item.model';
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum Roles {
  Admin = 'admin',
  User = 'user',
}

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @Index()
  username: string;

  @Column()
  password: string;

  @Column({ enum: Roles, type: 'enum', default: Roles.User })
  role: Roles;

  @OneToMany(() => UserItem, (userItem) => userItem.user)
  items: UserItem[];
}

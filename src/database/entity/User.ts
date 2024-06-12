import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './Base';
import { UserItem } from './UserItem';

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

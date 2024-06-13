import { IsNumber } from 'class-validator';
import { RemoveUserItem } from './remove-user-item.dto';

export class UpdateItemLevelDto extends RemoveUserItem {
  @IsNumber()
  level: number;
}

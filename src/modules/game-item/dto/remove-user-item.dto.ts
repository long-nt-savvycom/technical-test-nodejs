import { IsNumber, IsString, IsUUID } from 'class-validator';

export class RemoveUserItem {
  @IsString()
  @IsUUID()
  userItemId: string;
}

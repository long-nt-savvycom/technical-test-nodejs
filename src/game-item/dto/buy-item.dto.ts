import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class BuyItemDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  itemId: string;
}

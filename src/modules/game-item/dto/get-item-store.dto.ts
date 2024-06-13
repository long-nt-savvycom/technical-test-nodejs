import { PagingDto } from '@utils/dto/paging.dto';
import { IsOptional, IsString } from 'class-validator';

export class GetItemStoreDto extends PagingDto {
  @IsString()
  @IsOptional()
  search?: string;
}

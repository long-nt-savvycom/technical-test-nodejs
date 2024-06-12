import { IsOptional, IsString } from 'class-validator';
import { PagingDto } from '../../common/dto/paging.dto';

export class GetItemStoreDto extends PagingDto {
  @IsString()
  @IsOptional()
  search?: string;
}

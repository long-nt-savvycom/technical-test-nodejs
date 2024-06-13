import { IsOptional } from 'class-validator';

export class PagingDto {
  @IsOptional()
  offset?: number = 0;

  @IsOptional()
  limit?: number = 10;
}

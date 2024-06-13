import { IsNumberString, IsOptional } from 'class-validator';

export class PagingDto {
  @IsOptional()
  @IsNumberString()
  offset?: number = 0;

  @IsOptional()
  @IsNumberString()
  limit?: number = 10;
}

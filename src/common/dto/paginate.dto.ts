import { IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginateDTO {
  @IsOptional()
  path: string;

  @IsOptional()
  type: string;

  @IsOptional()
  rank: string;

  @IsNotEmpty()
  @Type(() => Number)
  take: number;

  @IsNotEmpty()
  @Type(() => Number)
  page: number;
}

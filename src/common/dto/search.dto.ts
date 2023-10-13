import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsNotEmpty()
  @Type(() => Number)
  take: number;

  @IsNotEmpty()
  @Type(() => Number)
  page: number;
}

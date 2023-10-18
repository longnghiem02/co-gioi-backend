import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginateDTO {
  @IsOptional()
  @ApiProperty({
    description: 'path',
    example: 0,
  })
  @Type(() => Number)
  path: number;

  @IsOptional()
  @ApiProperty({
    description: 'type',
    example: 0,
  })
  @Type(() => Number)
  type: number;

  @IsOptional()
  @ApiProperty({
    description: 'rank',
    example: 0,
  })
  @Type(() => Number)
  rank: number;

  @IsNotEmpty()
  @ApiProperty({
    description: 'take',
    example: 6,
  })
  @Type(() => Number)
  take: number;

  @IsNotEmpty()
  @ApiProperty({
    description: 'page',
    example: 1,
  })
  @Type(() => Number)
  page: number;
}

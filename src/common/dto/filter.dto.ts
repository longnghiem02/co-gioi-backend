import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterDTO {
  @IsOptional()
  @ApiProperty({
    description: 'Path id',
    example: 0,
  })
  @Type(() => Number)
  pathId: number;

  @IsOptional()
  @ApiProperty({
    description: 'Type id',
    example: 0,
  })
  @Type(() => Number)
  typeId: number;

  @IsOptional()
  @ApiProperty({
    description: 'Rank id',
    example: 0,
  })
  @Type(() => Number)
  rankId: number;
}

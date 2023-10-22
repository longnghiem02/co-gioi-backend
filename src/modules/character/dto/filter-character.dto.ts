import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterCharacterDTO {
  @IsOptional()
  @ApiProperty({
    description: 'Main path id',
    example: 0,
  })
  @Type(() => Number)
  mainPathId: number;

  @IsOptional()
  @ApiProperty({
    description: 'Sub path id',
    example: 0,
  })
  @Type(() => Number)
  subPathId: number;

  @IsOptional()
  @ApiProperty({
    description: 'Region id',
    example: 0,
  })
  @Type(() => Number)
  regionId: number;

  @IsOptional()
  @ApiProperty({
    description: 'Race id',
    example: 0,
  })
  @Type(() => Number)
  raceId: number;

  @IsOptional()
  @ApiProperty({
    description: 'Physique id',
    example: 0,
  })
  @Type(() => Number)
  physiqueId: number;
}

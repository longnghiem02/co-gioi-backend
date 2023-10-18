import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchDTO {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'name',
    example: 'Example',
  })
  name: string;

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

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginateDTO {
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

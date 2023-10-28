import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class PaginateDTO {
  @IsOptional()
  @IsNumberString()
  @ApiProperty({
    description: 'page',
    example: '1',
  })
  page?: number;

  @IsOptional()
  @IsNumberString()
  @ApiProperty({
    description: 'limit',
    example: '6',
  })
  limit?: number;
}

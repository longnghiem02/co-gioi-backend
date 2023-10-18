import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class IdDTO {
  @IsNotEmpty()
  @ApiProperty({
    description: 'id',
    example: 0,
  })
  @Type(() => Number)
  id: number;
}

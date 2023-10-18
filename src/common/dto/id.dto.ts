import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class IdDTO {
  @IsNotEmpty()
  @ApiProperty({
    description: 'id',
    example: '',
  })
  @Type(() => Number)
  id: number;
}

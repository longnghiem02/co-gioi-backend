import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilterOtherInfoDTO {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'type',
    example: 'Example',
  })
  type: string;
}

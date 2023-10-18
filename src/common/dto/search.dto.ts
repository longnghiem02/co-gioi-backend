import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchDTO {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'name',
    example: 'Example',
  })
  name: string;
}

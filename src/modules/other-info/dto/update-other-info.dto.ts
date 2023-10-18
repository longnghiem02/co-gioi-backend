import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateOtherInfoDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'name',
    example: 'Example',
  })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'detail',
    example: 'Example',
  })
  detail: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'type',
    example: 'Example',
  })
  type: string;
}

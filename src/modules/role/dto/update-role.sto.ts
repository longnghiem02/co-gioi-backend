import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateRoleDTO {
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
}
